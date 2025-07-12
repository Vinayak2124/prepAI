import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://Prep-AI-Smart-Study-Material_owner:npg_5feuEw7bZcHU@ep-tight-rain-a1p8nyrb-pooler.ap-southeast-1.aws.neon.tech/Prep-AI-Smart-Study-Material?sslmode=require",
  },
});
