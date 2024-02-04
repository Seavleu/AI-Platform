import * as z from "zod";

export const formSchema =z.object({
    prompt: z.string().min(1, {
        message: "Image Prompt is required",
}),
amount: z.string().min(1),
resolution:z.string().min(1)
});

export const amountOptions = [
    {
        value: "1",
        label: "1 Photo",
    },
    {
        value: "2",
        label: "2 Photos",
    },
    {
        value: "3",
        label: "3 Photos",
    },
    {
        value: "4",
        label: "4 Photos",
    },
    {
        value: "5",
        label: "5 Photos",
    }
]

export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",

    },
    {
        value: "512x512",
        label: "512x512",

    },
    {
        value: "1024x1024",
        label: "1024x1024",

    },

]

//In this schema:

// z.object({}) defines an object schema.
// prompt is a key in the object, representing a field in your form.
// z.string() defines that the prompt field should be a string type.
// .min(1, {...}) sets a validation rule that the string should have a minimum length of 1 character. If it fails this validation, it returns the message "Prompt is required".
// This schema ensures that the prompt field in your form is a string of at least one character in length.