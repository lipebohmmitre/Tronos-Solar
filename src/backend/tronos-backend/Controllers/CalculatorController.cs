using Microsoft.AspNetCore.Mvc;
using tronos_backend.DTO;
using tronos_backend.Interfaces;

namespace tronos_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculatorController : ControllerBase
    {
        private readonly ICalculatorService _calculatorService;

        public CalculatorController(ICalculatorService calculatorService)
        {
            _calculatorService = calculatorService;
        }

        [HttpGet("{valorReal}")]
        public CalculatorResultDTO Get([FromRoute] double valorReal)
        {
            return _calculatorService.CalculateCost(valorReal);
        }

        [HttpGet("Conversor/{valorReal}")]
        public CalculatorConversorDTO GetConversorRealToKWh([FromRoute] double valorReal)
        {
            return _calculatorService.ConverteRealEmEnergia(valorReal);
        }
    }
}