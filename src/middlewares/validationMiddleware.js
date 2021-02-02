export const validateSchema = (schema) => (request, response, next) => {
  const { error, value: payload } = schema.validate(
    request.body, { abortEarly: false, stripUnknown: true },
  );

  if (error) {
    const errors = error.details.map(({ path, message }) => ({ field: path[0], message }));
    response.status(400).send({ status: 400, errors });
    return;
  }

  request.body = payload;
  next();
};
