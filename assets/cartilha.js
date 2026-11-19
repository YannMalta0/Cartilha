/* Renderiza a cartilha a partir do objeto CARTILHA definido no index.html de cada prédio.
   Não é preciso mexer neste arquivo para atualizar conteúdo. */
(function () {
  var C = window.CARTILHA;
  if (!C) return;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  // Texto: escapa HTML, destaca [campos a preencher] e aceita *negrito*
  function txt(s) {
    return esc(s)
      .replace(/\[([^\]]+)\]/g, '<mark class="ph">[$1]</mark>')
      .replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
  }
  function soDigitos(s) { return String(s || "").replace(/\D/g, ""); }
  function el(id) { return document.getElementById(id); }

  document.title = "Cartilha do Morador – " + C.predio;

  el("predio").innerHTML = txt(C.predio);
  el("endereco").innerHTML = txt(C.endereco);
  el("boas-vindas").innerHTML = (C.boasVindas || []).map(function (p) { return "<p>" + txt(p) + "</p>"; }).join("");
  el("atualizado").innerHTML = txt(C.atualizadoEm);

  // Atalhos para as seções
  el("atalhos").innerHTML = '<a href="#contatos"><span class="ic">📞</span>Contatos</a>' +
    C.secoes.map(function (s) {
      return '<a href="#' + s.id + '" data-abrir="' + s.id + '"><span class="ic">' + s.icone + "</span>" + esc(s.titulo) + "</a>";
    }).join("");

  // Contatos
  el("lista-contatos").innerHTML = (C.contatos || []).map(function (c) {
    var acoes = "";
    var tel = soDigitos(c.telefone);
    var wpp = soDigitos(c.whatsapp);
    if (tel) acoes += '<a class="btn" href="tel:+55' + tel + '">📞 Ligar</a>';
    if (wpp) acoes += '<a class="btn whats" href="https://wa.me/55' + wpp + '" target="_blank" rel="noopener">💬 WhatsApp</a>';
    if (c.email && c.email.indexOf("[") === -1) acoes += '<a class="btn" href="mailto:' + esc(c.email) + '">✉️ E-mail</a>';
    return '<div class="contato">' +
      '<div class="funcao">' + txt(c.funcao) + "</div>" +
      '<div class="nome">' + txt(c.nome) + "</div>" +
      (c.telefone ? "<div>" + txt(c.telefone) + "</div>" : "") +
      (c.email ? "<div>" + txt(c.email) + "</div>" : "") +
      (c.horario ? '<div class="horario">' + txt(c.horario) + "</div>" : "") +
      (acoes ? '<div class="acoes">' + acoes + "</div>" : "") +
      "</div>";
  }).join("");

  // Emergência
  el("emergencia").innerHTML = (C.emergencia || []).map(function (e) {
    return '<a href="tel:' + soDigitos(e.numero) + '"><strong>' + esc(e.numero) + "</strong><span>" + esc(e.nome) + "</span></a>";
  }).join("");

  // Seções
  el("secoes").innerHTML = C.secoes.map(function (s) {
    var corpo = "";
    if (s.itens && s.itens.length) corpo += "<ul>" + s.itens.map(function (i) { return "<li>" + txt(i) + "</li>"; }).join("") + "</ul>";
    if (s.aviso) corpo += '<div class="aviso">⚠️ ' + txt(s.aviso) + "</div>";
    if (s.links && s.links.length) {
      corpo += '<div class="links">' + s.links.map(function (l) {
        var ok = l.url && l.url.indexOf("[") === -1;
        return ok ? '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">🔗 ' + esc(l.texto) + "</a>"
                  : '<span class="btn">🔗 ' + esc(l.texto) + ' <mark class="ph">[link]</mark></span>';
      }).join("") + "</div>";
    }
    return '<details class="secao" id="' + s.id + '">' +
      '<summary><span class="ic">' + s.icone + "</span>" + esc(s.titulo) + '<span class="seta">›</span></summary>' +
      '<div class="corpo">' + corpo + "</div></details>";
  }).join("");

  // Abrir seção ao clicar no atalho ou ao chegar com #ancora
  function abrir(id) {
    var d = document.getElementById(id);
    if (d && d.tagName === "DETAILS") d.open = true;
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-abrir]");
    if (a) abrir(a.getAttribute("data-abrir"));
  });
  if (location.hash) abrir(location.hash.slice(1));

  // Busca
  var campo = el("campo-busca");
  var vazio = el("vazio");
  campo.addEventListener("input", function () {
    var q = campo.value.trim().toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
    var achou = 0;
    document.querySelectorAll("details.secao").forEach(function (d) {
      var t = d.textContent.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      var bate = !q || t.indexOf(q) !== -1;
      d.style.display = bate ? "" : "none";
      d.open = !!q && bate;
      if (bate) achou++;
    });
    vazio.style.display = achou ? "none" : "block";
  });
})();
