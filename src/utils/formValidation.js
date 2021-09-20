const FormValidation = (definition, fieldValues) => {
    
    let fieldResults = {};
    let schemaErrors = [];
    let hasError = false;
    for (let fieldKey of Object.keys(fieldValues)) {
        let fieldValue = fieldValues[fieldKey];
        let fieldErrors = [];
        let fieldDef = definition.find(field => field._id === fieldKey);
        
        if (!fieldDef) {
            schemaErrors.push(`Field with id ${fieldKey} doesn't exist in structure of document`);
            hasError = true;
        } else {
            switch (fieldDef.type) {
                case "number":
                    if (!validateNumeric(fieldValue)) {
                        fieldErrors.push("Field isn't numeric");
                        hasError = true;
                    }
                    break;
                case "Text": // Inconsistent use of type definition
                case "text":
                    if (!validateText(fieldValue, fieldDef.maxLength)) {
                        fieldErrors.push(`Field exceeds maxLength of  ${fieldDef.maxLength}`);
                        hasError = true;
                    }
                    break;
                /* Implement other validations here... */
                default:
                    break;
            }
        }
        fieldResults = {...fieldResults, [fieldKey] : {value: fieldValue, errors : fieldErrors}};
    }

    return {
        valid: !hasError,
        fieldResults: fieldResults,
        schemaErrors: schemaErrors,
    };
}

const validateText = (v, maxLength) => typeof(v) === 'string' && v.length < maxLength;

const validateNumeric = v => !isNaN(v);

module.exports = FormValidation;