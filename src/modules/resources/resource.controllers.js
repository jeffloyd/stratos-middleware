import Resource from './resource.model';
import HTTPStatuses from 'http-status';

export async function createResource(req,res) {
  try {
    const resource = await Resource.createResource(
      req.body,
      req.user._id
    );
    return res.status(HTTPStatuses.CREATED).json(resource);
  } catch (error) {
    return res.status(HTTPStatuses.BAD_REQUEST).json(error);
  }
}

export async function getResourceById(req,res) {
  try {
    const resource = await Resource.findById(req.params.id).populate(`user`);
    return res.status(HTTPStatuses.OK).json(resource);
  } catch (error) {
    return res.status(HTTPStatuses.BAD_REQUEST).json(error);
  }
};

export  async function getResourceList(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const resource = await Resource.list({ limit, skip });
    return res.status(HTTPStatuses.OK).json(resource);
  } catch (error) {
    return res.status(HTTPStatuses.BAD_REQUEST).json(error);
  }
}