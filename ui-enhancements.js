/**
 * Redesign v3.0 — Melhorias de UX incrementais
 * 1. Badge contador de itens selecionados na aba "Impressão" do menu inferior
 * 2. Sombra na barra de pesquisa quando ela "gruda" no topo (sticky)
 * 3. Rolagem suave ao topo ao trocar de módulo pelo menu inferior
 */
document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------
    // 1. BADGE DE SELECIONADOS (medicamentos + hidratação + exames)
    // -----------------------------------------------------------------
    const badge = document.getElementById('nav-badge-emissao');

    function atualizarBadgeSelecao() {
        if (!badge) return;
        const meds = document.querySelectorAll('.med-checkbox:checked').length;
        const hidratacao = document.querySelectorAll('#chk-holliday:checked, #chk-dengue:checked').length;
        const exames = document.querySelectorAll('.exam-check:checked').length;
        const total = meds + hidratacao + exames;

        badge.textContent = total;
        badge.hidden = total === 0;
    }

    // Delegação de eventos cobre os cards gerados dinamicamente
    document.addEventListener('change', (e) => {
        if (e.target.matches('.med-checkbox, #chk-holliday, #chk-dengue, .exam-check')) {
            atualizarBadgeSelecao();
        }
    });

    // Botões que limpam a seleção programaticamente (sem disparar 'change')
    ['btn-limpar-prescricao', 'btn-limpar-exames', 'btn-novo-paciente', 'btn-novo-paciente-top'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => setTimeout(atualizarBadgeSelecao, 60));
    });

    atualizarBadgeSelecao();

    // -----------------------------------------------------------------
    // 2. SOMBRA NA BUSCA STICKY quando estiver "grudada" no topo
    // -----------------------------------------------------------------
    const searchWrapper = document.querySelector('.med-search-bar-wrapper');
    if (searchWrapper && 'IntersectionObserver' in window) {
        const sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        searchWrapper.parentNode.insertBefore(sentinel, searchWrapper);

        const observer = new IntersectionObserver(
            ([entry]) => {
                searchWrapper.classList.toggle('is-stuck', !entry.isIntersecting);
            },
            { rootMargin: '-9px 0px 0px 0px', threshold: 0 }
        );
        observer.observe(sentinel);
    }

    // -----------------------------------------------------------------
    // 3. VOLTAR AO TOPO SUAVEMENTE AO TROCAR DE MÓDULO
    // -----------------------------------------------------------------
    document.querySelectorAll('.bottom-nav .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
