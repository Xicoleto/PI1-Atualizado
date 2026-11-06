import { useState } from "react";

function NovoRequerimento({
  mudarPagina,
  altoContraste,
  alternarContraste,
}) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [motivo, setMotivo] = useState("");
  const [descricao, setDescricao] = useState("");

  const cores = altoContraste
    ? {
        fundo: "#000000",
        cartao: "#000000",
        texto: "#FFFFFF",
        destaque: "#FFFF00",
        textoDestaque: "#000000",
        campo: "#000000",
        borda: "#FFFF00",
      }
    : {
        fundo: "#F5F7FA",
        cartao: "#FFFFFF",
        texto: "#374151",
        destaque: "#0F4C5C",
        textoDestaque: "#FFFFFF",
        campo: "#FFFFFF",
        borda: "#9CA3AF",
      };

  async function enviar(e) {
    e.preventDefault();

    // Validação básica antes de enviar os dados
    if (!nome || !cpf || !email) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    // Valida se o CPF tem mesmo apenas 11 digitos numéricos
       if (cpf.length !== 11) {
      alert("O CPF deve ter 11 números.");
      return;
    }

    // Monta o objeto exatamente como o Backend espera
    const dadosSolicitacao = {
      nome_solicitante: nome,
      id_requerente: cpf,
      email: email,
      telefone: telefone,
      data_ocorrencia: data ? new Date(data) : new Date(),
      local_ocorrencia: local,
      motivo: motivo,
      descricao_ocorrencia: descricao,
      status_atual: "Pendente",
      numero_protocolo: "ITV-" + Date.now(),
    };

    try {
      // Chama o Backend na porta 3001
      const resposta = await fetch(
        "http://localhost:3001/api/solicitacoes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosSolicitacao),
        }
      );

      if (resposta.ok) {
        alert("Sucesso! Sua solicitação foi salva no banco de dados.");
        mudarPagina("sucesso");
      } else {
        const erro = await resposta.json();
        alert(
          "Erro no servidor: " +
            (erro.error || "Falha ao salvar")
        );
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("O Backend está desligado ou o Docker travou!");
    }
  }

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: cores.fundo,
      }}
    >
      {/* TOPO */}
      <header
        style={{
          ...styles.header,
          backgroundColor: altoContraste ? "#000000" : "#0F4C5C",
          borderBottom: altoContraste ? "2px solid #FFFF00" : "none",
        }}
      >
        <h1 style={styles.headerTitle}>
          Sistema Digital de Requerimento
        </h1>

        <button
          type="button"
          onClick={alternarContraste}
          aria-pressed={altoContraste}
          style={{
            ...styles.contrastButton,
            backgroundColor: altoContraste ? "#FFFF00" : "#FFFFFF",
            color: altoContraste ? "#000000" : "#0F4C5C",
            border: altoContraste
              ? "2px solid #FFFF00"
              : "2px solid #FFFFFF",
          }}
        >
          {altoContraste
            ? "Desativar alto contraste"
            : "Ativar alto contraste"}
        </button>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main style={styles.main}>
        <section
          style={{
            ...styles.card,
            backgroundColor: cores.cartao,
            border: altoContraste ? "2px solid #FFFF00" : "none",
          }}
          aria-labelledby="titulo-requerimento"
        >
          <h2
            id="titulo-requerimento"
            style={{
              ...styles.cardTitle,
              color: altoContraste ? cores.destaque : "#1F2937",
            }}
          >
            Novo Requerimento
          </h2>

          <p
            id="orientacao-formulario"
            style={{
              ...styles.instructions,
              color: cores.texto,
            }}
          >
            Os campos marcados com (*) são obrigatórios.
          </p>

          <form onSubmit={enviar} noValidate>
            {/* NOME */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="nome"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                Nome do solicitante *
              </label>

              <input
                id="nome"
                name="nome"
                type="text"
                style={{
                  ...styles.input,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* CPF */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="cpf"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                CPF * (SOMENTE NÚMEROS)
              </label>

              <input
                id="cpf"
                name="cpf"
                type="text"
                inputMode="numeric"
                maxLength={11} //de 14 para 11, garantindo que não tenha mais itens
                style={{
                  ...styles.input,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
                value={cpf}
                onChange={(e) => setCpf(e.target.value.replace(/\D/g, "").slice(0, 11))} //Grava apenas 11 digitos numéricos
                required
                aria-required="true"
              />
            </div>

            {/* EMAIL */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="email"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                E-mail *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                style={{
                  ...styles.input,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* TELEFONE */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="telefone"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                Telefone *
              </label>

              <input
                id="telefone"
                name="telefone"
                type="tel"
                inputMode="tel"
                style={{
                  ...styles.input,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* DATA */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="data"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                Data do ocorrido *
              </label>

              <input
                id="data"
                name="data"
                type="date"
                style={{
                  ...styles.input,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                  colorScheme: altoContraste ? "dark" : "light",
                }}
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* LOCAL */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="local"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                Local da ocorrência *
              </label>

              <input
                id="local"
                name="local"
                type="text"
                style={{
                  ...styles.input,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* MOTIVO */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="motivo"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                Motivo da solicitação *
              </label>

              <input
                id="motivo"
                name="motivo"
                type="text"
                style={{
                  ...styles.input,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* DESCRIÇÃO */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="descricao"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                Descrição da solicitação *
              </label>

              <textarea
                id="descricao"
                name="descricao"
                style={{
                  ...styles.textarea,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            {/* ANEXO */}
            <div style={styles.fieldGroup}>
              <label
                htmlFor="arquivo"
                style={{
                  ...styles.label,
                  color: cores.texto,
                }}
              >
                Anexo
              </label>

              <input
                id="arquivo"
                name="arquivo"
                type="file"
                style={{
                  ...styles.fileInput,
                  color: cores.texto,
                  backgroundColor: cores.campo,
                  borderColor: cores.borda,
                }}
              />
            </div>

            {/* DECLARAÇÃO */}
            <div style={styles.checkboxContainer}>
              <input
                id="declaracao"
                name="declaracao"
                type="checkbox"
                style={{
                  ...styles.checkbox,
                  accentColor: altoContraste ? "#FFFF00" : "#0F4C5C",
                }}
                required
                aria-required="true"
              />

              <label
                htmlFor="declaracao"
                style={{
                  ...styles.checkboxLabel,
                  color: cores.texto,
                }}
              >
                Declaro que as informações fornecidas são verdadeiras.
              </label>
            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              style={{
                ...styles.button,
                backgroundColor: cores.destaque,
                color: cores.textoDestaque,
                borderColor: cores.destaque,
              }}
            >
              Enviar solicitação
            </button>
          </form>
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
  },

  header: {
    width: "100%",
    padding: "18px 20px",
    textAlign: "center",
    boxSizing: "border-box",
  },

  headerTitle: {
    margin: 0,
    fontSize: "22px",
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
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  card: {
    padding: "32px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box",
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: "12px",
    fontSize: "24px",
    textAlign: "center",
  },

  instructions: {
    marginTop: 0,
    marginBottom: "28px",
    fontSize: "15px",
    lineHeight: "1.5",
    textAlign: "center",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },

  label: {
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    minHeight: "48px",
    padding: "12px",
    borderRadius: "6px",
    border: "2px solid",
    boxSizing: "border-box",
    fontSize: "16px",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "6px",
    border: "2px solid",
    boxSizing: "border-box",
    fontSize: "16px",
    lineHeight: "1.5",
    resize: "vertical",
  },

  fileInput: {
    width: "100%",
    minHeight: "48px",
    padding: "10px",
    borderRadius: "6px",
    border: "2px solid",
    boxSizing: "border-box",
    fontSize: "15px",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginTop: "8px",
    marginBottom: "24px",
  },

  checkbox: {
    width: "20px",
    height: "20px",
    margin: 0,
    flexShrink: 0,
    cursor: "pointer",
  },

  checkboxLabel: {
    fontSize: "15px",
    lineHeight: "1.5",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    minHeight: "48px",
    padding: "12px 16px",
    border: "2px solid",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
  },
};

export default NovoRequerimento;