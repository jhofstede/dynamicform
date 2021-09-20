import FormValidation from '../utils/formValidation';

const testSchema = {
  fields: [
    {
      _id: "cc4cb134-fda0-44d8-8e92-e42ebbceb415",
      label: "Client Name",
      name: "name",
      type: "Text",
      maxLength: 100,
    },

    {
      _id: "228b905f-4a43-4a40-b829-0c6a04ad4782",
      label: "Client Age",
      name: "age",
      type: "number",
    },
  ],
};

test('validate number as string', () => {
  const result = FormValidation(testSchema.fields, {
    "228b905f-4a43-4a40-b829-0c6a04ad4782": "23",
  });
  expect(result.valid).toBeTruthy();
});
test('validate number', () => {
  const result = FormValidation(testSchema.fields, {
    "228b905f-4a43-4a40-b829-0c6a04ad4782": 23,
  });
  expect(result.valid).toBeTruthy();
  expect(result.fieldResults["228b905f-4a43-4a40-b829-0c6a04ad4782"].errors).toHaveLength(0);
});
test('validate number: non number', () => {
  const result = FormValidation(testSchema.fields, {
    "228b905f-4a43-4a40-b829-0c6a04ad4782": "XYZ",
  });
  expect(result.valid).toBeFalsy();
  expect(result.fieldResults["228b905f-4a43-4a40-b829-0c6a04ad4782"].errors).toHaveLength(1);
});
test('validate payload: non existing field', () => {
  const result = FormValidation(testSchema.fields, {
    "ABC": "XYZ",
  });
  expect(result.valid).toBeFalsy();
  expect(result.schemaErrors).toHaveLength(1);
});
