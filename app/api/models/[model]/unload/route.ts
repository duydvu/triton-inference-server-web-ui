import fetchServer from "@/api/server";

export async function POST(
  request: Request,
  { params }: { params: { model: string } }
) {
  const { model } = params;

  try {
    const res = await fetchServer(`v2/repository/models/${model}/unload`, { method: 'POST' });

    if (!res.ok) {
      const error = await res.text();
      return Response.json({ error }, { status: res.status });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
