import middleware from "../../middleware";
export async function POST(req, res) {
  const response = await middleware(req);

  if (response) {
    return response;
  }
  const val = await req.json();
  const weightInKg = parseFloat(val.weight);
  const heightInM = parseFloat(val.height) / 100;

  if (
    !isNaN(weightInKg) &&
    !isNaN(heightInM) &&
    weightInKg > 0 &&
    heightInM > 0
  ) {
    const bmi = weightInKg / (heightInM * heightInM);
    return new Response(bmi.toString());
  }

  return new Response("Error");
}
