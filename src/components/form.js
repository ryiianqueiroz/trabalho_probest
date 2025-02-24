import "../styles/form.css";
import { useState, useEffect } from "react";

function Form() {
  const fieldLabels = {
    alcool: "Álcool",
    acidoMalico: "Ácido Málico",
    cinza: "Cinza",
    alcalinidadeCinzas: "Alcalinidade das Cinzas",
    magnesio: "Magnésio",
    fenoisTotais: "Fenóis Totais",
    flavonoides: "Flavonoides",
    fenoisNaoFlavonoides: "Fenóis não Flavonoides",
    intensidadeCor: "Intensidade da Cor",
    matiz: "Matiz",
    vinhosDiluidos: "Vinhos Diluídos",
    prolina: "Prolina",
  };

  const [formData, setFormData] = useState(
    Object.keys(fieldLabels).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
    );

    const response = await fetch("https://back-probest.onrender.com/predict/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    const data = await response.json();
    console.log("Resposta da API:", data);
    console.log("Resultado da previsão:", data.prediction);
  };

  useEffect(() => {
    const fetchPredict = async () => {
      try {
        const response = await fetch("https://back-probest.onrender.com/predict/");
        const data = await response.json();
        console.log("GET /predict resposta:", data);
      } catch (error) {
        console.error("Erro ao fazer GET /predict:", error);
      }
    };

    fetchPredict();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="styled-form">
        {Object.keys(fieldLabels).map((key) => (
          <div key={key} className="form-group">
            <label className="form-label">{fieldLabels[key]}:</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Form;