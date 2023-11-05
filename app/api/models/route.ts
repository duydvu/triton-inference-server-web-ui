import fetchServer from "@/api/server";

export async function POST() {
  try {
    const res = await fetchServer(`v2/repository/index`, { method: 'POST' });

    if (!res.ok) {
      const error = await res.text();
      return Response.json({ error }, { status: res.status });
    }

    return Response.json(await res.json());
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
