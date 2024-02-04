import * as z from "zod";

export const formSchema =z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required",
}),
});
//In this schema:

// z.object({}) defines an object schema.
// prompt is a key in the object, representing a field in your form.
// z.string() defines that the prompt field should be a string type.
// .min(1, {...}) sets a validation rule that the string should have a minimum length of 1 character. If it fails this validation, it returns the message "Prompt is required".
// This schema ensures that the prompt field in your form is a string of at least one character in length.