import fetchServer from "@/api/server";

export async function GET(
  request: Request,
  { params }: { params: { model: string, version: string } }
) {
  const { model, version } = params;

  try {
    const [configRes, statsRes] = await Promise.all([
      fetchServer(`v2/models/${model}/versions/${version}/config`, { cache: 'no-store' }),
      fetchServer(`v2/models/${model}/versions/${version}/stats`, { cache: 'no-store' }),
    ]);

    if (!configRes.ok) {
      const error = await configRes.text();
      return Response.json({ error }, { status: configRes.status });
    }

    if (!statsRes.ok) {
      const error = await statsRes.text();
      return Response.json({ error }, { status: statsRes.status });
    }

    return Response.json({
      config: await configRes.json(),
      stats: (await statsRes.json()).model_stats[0],
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
