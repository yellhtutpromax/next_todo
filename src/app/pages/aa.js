// pages/protected.js

import { getSession } from "next-auth/react";

export default function ProtectedPage() {
  return <h1>Protected Content</h1>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
