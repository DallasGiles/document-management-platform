import { SitePlan } from '../models/sitePlan.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { uploadFile, getObjectSignedUrl } from '../util/aws.js';
// TODO: All users will likely need to use query for viewing sitePlans.
// TODO: Potentially remove/comment out all approval related mutations as this feature will not be ready
export const sitePlanResolvers = {
  Upload: GraphQLUpload,
  Query: {
    sitePlans: async (parent, args, { user }) => {
      if (user.role !== 'Foreman') {
        throw new Error('Forbidden');
      }
      
      const sitePlans = await SitePlan.find({ team: user.organization });

      if (!sitePlans) {
        throw new Error('No site plans for team');
      }

      const promises = sitePlans.map(async (plan) => {
        plan.url = await getObjectSignedUrl(plan.fileKey);
        
        return plan;
      });

      const result = await Promise.all(promises);
      return result;
    },
    sitePlan: async (parent, { id }) => {
      const plan = await SitePlan.findById(id);
      if (!plan) {
        throw new Error('Site plan not found');
      }
      const file = await getFile(plan.fileKey);
      plan.fileContent = file.toString('utf-8');
      return plan;
    },
  },
  Mutation: {
    // uploadPlan: async (parent, { title, content }, { user }) => {
    uploadPlan: async (parent, { file }, { user }) => {
      if (user.role !== 'Foreman') {
        throw new Error('Forbidden');
      }
      const { createReadStream, filename, mimetype } = (await file).file;
      
      const stream = createReadStream();
      const uploadResponse = await uploadFile(stream, filename, mimetype);
      const newPlan = new SitePlan({
        title: filename,
        content: uploadResponse.Location, // URL to the file in S3
        fileKey: uploadResponse.Key,
        uploadedBy: user.id,
        team: user.organization,
      });
      return newPlan.save();
    },
    submitForApproval: async (parent, { planId }, { user }) => {
      if (user.role !== 'Basic User') {
        throw new Error('Forbidden');
      }
      const plan = await SitePlan.findById(planId);
      if (!plan) {
        throw new Error('Site plan not found');
      }
      plan.status = 'Pending';
      return plan.save();
    },
    approvePlan: async (parent, { planId }, { user }) => {
      if (user.role !== 'Foreman') {
        throw new Error('Forbidden');
      }
      const plan = await SitePlan.findById(planId);
      if (!plan) {
        throw new Error('Site plan not found');
      }
      plan.status = 'Approved';
      return plan.save();
    },
  },
};