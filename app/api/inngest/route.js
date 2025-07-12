import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {
  CreateNewUser,
  GenerateNotes,
  GenerateStudyTypeContent,
} from "../../../inngest/functions";

export const dynamic = "force-dynamic";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */

    CreateNewUser,
    GenerateNotes,
    GenerateStudyTypeContent,
  ],
});
