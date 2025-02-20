import "../styles/form.css";
import { useState } from "react";
import { useEffect } from "react";

function Form() {
  const [formData, setFormData] = useState({
    Álcool: "",
    Ácido_Málico: "",
    Cinza: "",
    Alcalinidade_das_Cinzas: "",
    Magnésio: "",
    Fenóis_Totais: "",
    Flavonoides: "",
    Fenois_não_Flavonoides: "",
    Intensidade_Cor: "",
    Matiz: "",
    OD280_OD315_Vinhos_Diluídos: "",
    Prolina: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Álcool: parseFloat(formData.Álcool),
        Ácido_Málico: parseFloat(formData.Ácido_Málico),
        Cinza: parseFloat(formData.Cinza),
        Alcalinidade_das_Cinzas: parseFloat(formData.Alcalinidade_das_Cinzas),
        Magnésio: parseFloat(formData.Magnésio),
        Fenóis_Totais: parseFloat(formData.Fenóis_Totais),
        Flavonoides: parseFloat(formData.Flavonoides),
        Fenois_não_Flavonoides: parseFloat(formData.Fenois_não_Flavonoides),
        Intensidade_Cor: parseFloat(formData.Intensidade_Cor),
        Matiz: parseFloat(formData.Matiz),
        OD280_OD315_Vinhos_Diluídos: parseFloat(formData.OD280_OD315_Vinhos_Diluídos),
        Prolina: parseFloat(formData.Prolina),
      }),
    });
  
    const data = await response.json();
    console.log("Resposta da API:", data); // Exibir dados no console
    console.log("Resultado da previsão:", data.prediction);
  };
  

  useEffect(() => {
    const fetchPredict = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/predict/");
        const data = await response.json();
        console.log("GET /predict resposta:", data);
      } catch (error) {
        console.error("Erro ao fazer GET /predict:", error);
      }
    };
  
    fetchPredict();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}: </label>
          <input
            type="number"
            name={key}
            value={formData[key]} // Corrigido para usar o estado
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form;
