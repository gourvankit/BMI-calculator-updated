export async function POST(req, res) {
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
    // res.status(200).json({ bmi });
    return new Response(bmi);
  }
  return new Response("Ok");
}
