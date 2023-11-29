namespace tronos_backend.DTO
{
    public class CalculatorResultDTO
    {
        public float TotalModules { get; set; }
        public float TotalPowerEnergy { get; set; }
        public float TotalEconomy { get; set; }
    }

    public class CalculatorConversorDTO
    {
        public float ConversorRealToEnergy { get; set; }
    }
}