import { connectToDB } from "@utils/database";
import Prompt from "@components/prompt";

// GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");
        if(!prompt) return new Response("Prompt not found!", {status: 404});

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response("Internal server error!", {status: 500})   
    }
}

// PATCH(update)
export const PATCH = async (request, { params }) => {

    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found!", {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.save();

        return new Response("Prompt updated successfully", {status: 200});
    } catch (error) {
        return new Response("Unable to update the prompt", {status: 500});
    }
}

// DELETE
export const DELETE = async (request, { params } ) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt Deleted Successfully", {status: 200});
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500});
    }
}