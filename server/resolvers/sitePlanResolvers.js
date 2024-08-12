const SitePlan = require('../models/SitePlan');
// Change code below to appropriate functions from AWS SDK
const { uploadFile, deleteFile, getObjectSignedUrl } = require('../utils/aws');

const sitePlanResolvers = {
  Query: {
    sitePlans: async (parent, args, { user }) => {
      if (user.role !== 'Foreman') {
        throw new Error('Forbidden');
      }
      return SitePlan.find({ team: user.organization });
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
      // const file = {
      //   filename: `${title}-${Date.now()}.pdf`,
      //   content: Buffer.from(content, 'utf-8'), // Ensure content is in Buffer format
      // };
      const { createReadStream, filename, mimetype } = await file;
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

module.exports = sitePlanResolvers;