"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios"; //
import db from "@/configs/db";

import { eq } from "drizzle-orm";
import { USER_TABLE } from "@/configs/schema";

function Provider({ children }) {
  const { user } = useUser();
  const payload = {
    user: {
      fullName: user?.fullName ?? "Anonymous",
      primaryEmailAddress: {
        emailAddress:
          user?.primaryEmailAddress?.emailAddress ?? "no-email@example.com",
      },
    },
  };

  const checkIsNewUser = async () => {
    // If using Drizzle directly:
    // const result = await db
    //   .select()
    //   .from(USER_TABLE)
    //   .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
    // console.log(result);
    // if (result?.length === 0) {
    //   const userResp = await db
    //     .insert(USER_TABLE)
    //     .values({
    //       name: user?.fullName,
    //       email: user?.primaryEmailAddress?.emailAddress,
    //     })
    //     .returning({ id: USER_TABLE.id });
    //   console.log(userResp);
    // }

    // If using API route:
    const resp = await axios.post("/api/create-user", payload);
    console.log(resp.data);
  };

  useEffect(() => {
    if (user) {
      checkIsNewUser();
    }
  }, [user]);

  return <>{children}</>;
}

export default Provider;
