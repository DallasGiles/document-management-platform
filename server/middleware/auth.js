import jwt from 'jsonwebtoken';
// TODO: Determine if checkRole is necessary
// TODO: Do we need JWT_SECRET in our .env files?
export const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('req', req.header('Authorization'), JSON.stringify(req.headers), req.body);
  if (!authHeader) {
    console.log('No Auth Header');
    next();
    return;
  }
  const token = authHeader.replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_SECRET);
  try {
    req.user = data;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

export const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'You do not have permission to submit documents' });
  }
  next();
};