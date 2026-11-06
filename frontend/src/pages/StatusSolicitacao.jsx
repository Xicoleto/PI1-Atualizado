function StatusSolicitacao({
  solicitacoes,           // antes: status
  mudarPagina,
  altoContraste,
  alternarContraste,
}) {
  const cores = altoContraste
    ? {
        fundo: "#000000",
        cartao: "#000000",
        texto: "#FFFFFF",
        destaque: "#FFFF00",
        textoDestaque: "#000000",
        borda: "#FFFF00",
        caixaStatus: "#000000",
      }
    : {
        fundo: "#dcdcdc",
        cartao: "#FFFFFF",
        texto: "#1F2933",
        destaque: "#2d5be3",
        textoDestaque: "#FFFFFF",
        borda: "#2d5be3",
        caixaStatus: "#e5e7eb",
      };

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
          backgroundColor: altoContraste ? "#000000" : "#1e3a8a",
          borderBottom: altoContraste
            ? "2px solid #FFFF00"
            : "none",
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
            color: altoContraste ? "#000000" : "#1e3a8a",
            border: "2px solid #FFFF00",
          }}
        >
          {altoContraste
            ? "Desativar alto contraste"
            : "Ativar alto contraste"}
        </button>
      </header>

      <main style={styles.main}>
        <section
          style={{
            ...styles.card,
            backgroundColor: cores.cartao,
            border: altoContraste
              ? "2px solid #FFFF00"
              : "none",
          }}
          aria-labelledby="titulo-status"
        >
           <h2
            id="titulo-status"    // editado para caber mais de uma solicitação de forma mais eficiente
            style={{
              ...styles.title,
              color: altoContraste ? cores.destaque : "#1e3a8a",
            }}
          >
            Suas Solicitações
          </h2>

          <ul style={styles.lista} aria-label="Lista de solicitações">
            {solicitacoes.map((item) => (
              <li
                key={item.id}
                style={{
                  ...styles.item,
                  backgroundColor: cores.caixaStatus,
                  color: cores.texto,
                  border: altoContraste ? "2px solid #FFFF00" : "none",
                }}
              >
                <div style={styles.protocolo}>Protocolo: {item.numero_protocolo}</div>
                <div>Local: {item.local_ocorrencia}</div>
                <div>Data: {new Date(item.createdAt).toLocaleDateString("pt-BR")}</div>
                <div style={styles.situacao}>Situação: {item.status_atual}</div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            style={{
              ...styles.primaryButton,
              backgroundColor: cores.destaque,
              color: cores.textoDestaque,
              border: altoContraste
                ? "2px solid #FFFF00"
                : "none",
            }}
            onClick={() => mudarPagina("home")}
          >
            Voltar ao início
          </button>

          <button
            type="button"
            style={{
              ...styles.secondaryButton,
              backgroundColor: altoContraste ? "#000000" : "#FFFFFF",
              color: altoContraste ? "#FFFF00" : "#2d5be3",
              border: `2px solid ${cores.borda}`,
            }}
            onClick={() => mudarPagina("acompanhar")}
          >
            Nova busca
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
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    width: "100%",
    color: "#FFFFFF",
    padding: "18px 20px",
    boxSizing: "border-box",
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    boxSizing: "border-box",
  },

  card: {
    marginTop: "40px",
    padding: "30px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "560px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
  },

  title: {
    marginTop: 0,
    fontSize: "24px",
  },

  label: {
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "14px",
  },

  statusBox: {
    padding: "15px",
    borderRadius: "5px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  primaryButton: {
    width: "100%",
    minHeight: "48px",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },

  secondaryButton: {
    width: "100%",
    minHeight: "48px",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },

  lista: { listStyle: "none", 
    padding: 0,
    margin: "20px 0",
    textAlign: "left" 
    
  },

  item: { padding: "15px",
     borderRadius: "5px",
      marginBottom: "12px",
      fontSize: "14px",
      lineHeight: "1.6" 
      },
  
  protocolo: { fontWeight: "bold" 

  },
  
  situacao: { fontWeight: "bold",
     marginTop: "6px" 
  },

};

export default StatusSolicitacao;