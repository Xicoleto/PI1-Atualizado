
import { useState } from "react";

function AcompanharSolicitacao({
  mudarPagina,
  altoContraste,
  alternarContraste,
  setSolicitacoes,        // antes: setStatusRemoto
}) {
  
  const [cpf, setCpf] = useState("");

  const cores = altoContraste
    ? {
        fundo: "#000000",
        cartao: "#000000",
        texto: "#FFFFFF",
        destaque: "#FFFF00",
        textoDestaque: "#000000",
        borda: "#FFFF00",
        ajuda: "#FFFFFF",
      }
    : {
        fundo: "#F4F7F7",
        cartao: "#FFFFFF",
        texto: "#1F2933",
        destaque: "#006B6B",
        textoDestaque: "#FFFFFF",
        borda: "#7B9293",
        ajuda: "#435556",
      };

  async function buscar() {
    const cpfLimpo = cpf.replace(/\D/g, "");

     if (cpfLimpo.length !== 11) {
      alert("O CPF deve ter 11 números.");     //Antes checava só se estava vazio, agora checa se de fato tem 11 digitos apenas numéricos
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/solicitacoes/buscar/${cpfLimpo}`
      );

        if (response.ok) {
        const dados = await response.json();   // agora é uma lista

        if (setSolicitacoes) {
          setSolicitacoes(dados);
        }

        mudarPagina("status");
        } else {
        mudarPagina("naoEncontrado");
      }
      } catch (error) {
      console.error("Erro ao buscar:", error);
      alert("Erro de conexão com o servidor.");
      }
        }

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: cores.fundo,
      }}
    >
      <header
        style={{
          ...styles.header,
          backgroundColor: altoContraste ? "#000000" : "#004F4F",
          borderBottom: altoContraste
            ? "2px solid #FFFF00"
            : "none",
        }}
      >
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>
            Sistema Digital de Requerimento
          </h1>

          <button
            type="button"
            onClick={alternarContraste}
            aria-pressed={altoContraste}
            style={{
              ...styles.contrastButton,
              backgroundColor: altoContraste
                ? "#FFFF00"
                : "#FFFFFF",
              color: altoContraste
                ? "#000000"
                : "#004F4F",
              border: "2px solid #FFFF00",
            }}
          >
            {altoContraste
              ? "Desativar alto contraste"
              : "Ativar alto contraste"}
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <section
          style={{
            ...styles.card,
            backgroundColor: cores.cartao,
            border: altoContraste
              ? "2px solid #FFFF00"
              : "1px solid #AABFC0",
          }}
          aria-labelledby="titulo-pagina"
        >
          <h2
            id="titulo-pagina"
            style={{
              ...styles.title,
              color: altoContraste ? cores.destaque : "#004F4F",
            }}
          >
            Acompanhar Solicitação
          </h2>

          <p
            style={{
              ...styles.description,
              color: cores.texto,
            }}
          >
            Informe seu CPF para consultar o andamento das suas solicitações. 
          </p>  

          <div style={styles.formGroup}>
            <label
              htmlFor="cpf"
              style={{
                ...styles.label,
                color: cores.texto,
              }}
            >
              CPF
            </label>

            <input
              id="cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))} //Agora o campo CPF aceita apenas números e corrige se o usuario digitar outros caracteres
              style={{
                ...styles.input,
                backgroundColor: cores.cartao,
                color: cores.texto,
                borderColor: cores.borda,
              }}
              aria-describedby="cpf-ajuda"
            />

            <span
              id="cpf-ajuda"
              style={{
                ...styles.helpText,
                color: cores.ajuda,
              }}
            >
              Digite somente os números do CPF.
            </span>
          </div>

          <button
            type="button"
            style={{
              ...styles.button,
              backgroundColor: cores.destaque,
              color: cores.textoDestaque,
              border: altoContraste
                ? "2px solid #FFFF00"
                : "none",
            }}
            onClick={buscar}
            aria-label="Buscar solicitação pelo CPF"
          >
            Buscar solicitação
          </button>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    width: "100%",
    color: "#FFFFFF",
    boxSizing: "border-box",
  },

  headerContent: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "18px 20px",
    textAlign: "center",
  },

  headerTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#FFFFFF",
  },

  contrastButton: {
    marginTop: "14px",
    minHeight: "44px",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },

  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "60px 20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    borderRadius: "12px",
    padding: "32px",
    boxSizing: "border-box",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
  },

  title: {
    margin: "0 0 12px 0",
    fontSize: "28px",
    lineHeight: "1.3",
    textAlign: "center",
  },

  description: {
    margin: "0 0 28px 0",
    fontSize: "16px",
    lineHeight: "1.5",
    textAlign: "center",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    minHeight: "48px",
    padding: "12px",
    boxSizing: "border-box",
    border: "2px solid",
    borderRadius: "6px",
    fontSize: "16px",
  },

  helpText: {
    marginTop: "7px",
    fontSize: "14px",
    lineHeight: "1.4",
  },

  button: {
    width: "100%",
    minHeight: "50px",
    marginTop: "24px",
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default AcompanharSolicitacao;