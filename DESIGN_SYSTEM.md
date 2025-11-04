# 🎨 Sistema de Design - Estética Dracula Theme

## 📋 Informação Geral

Este projeto utiliza a **estética Dracula Theme**, uma paleta de cores dark mode com acentos neon vibrantes. A estética é inspirada no famoso tema Dracula para editores de código, combinando fundos escuros com cores fluorescentes (rosa, roxo, ciano) para criar um visual moderno, tech e futurista.

### Nomes da Estética
- **Dracula Theme** (nome principal)
- **Dark Neon** (estilo visual)
- **Cyberpunk Dark** (estética similar)
- **Neon Noir** (variação)

## 🎨 Paleta de Cores

### Cores Principais

#### Background (Fundo)
```
#0a0a0f - Background principal (preto azulado profundo)
#282a36 - Dark (cinza escuro)
#1a1b26 - Darker (preto mais intenso)
```

#### Cores de Acento (Neon)
```
#ff79c6 - Pink/Neon Pink (cor principal de destaque)
#bd93f9 - Purple/Neon Purple (cor secundária)
```

#### Cores de Texto
```
#f8f8f2 - Foreground (texto principal, quase branco)
#6272a4 - Comment (texto secundário, azul acinzentado)
```

#### Cards e Containers
```
rgba(26, 27, 38, 0.95) - Card Background (fundo de cards com transparência)
rgba(255, 121, 198, 0.15) - Card Border (bordas com transparência)
rgba(40, 42, 54, 0.95) - Card Background Light (fundo mais claro)
```

### Paleta Completa Dracula Theme

#### Cores Extras (para referência)
```
#50fa7b - Green (verde neon)
#f1fa8c - Yellow (amarelo neon)
#ffb86c - Orange (laranja)
#ff5555 - Red (vermelho)
#8be9fd - Cyan (ciano neon)
```

## 📐 Como Usar

### Gradientes Principais

#### Gradiente Rosa → Roxo (mais usado)
```css
background: linear-gradient(to right, #ff79c6, #bd93f9);
background: linear-gradient(135deg, #ff79c6 0%, #bd93f9 100%);
```

#### Gradiente Vertical Suave
```css
background: linear-gradient(
  to bottom,
  rgba(255, 121, 198, 0.06) 0%,
  transparent 40%,
  rgba(189, 147, 249, 0.06) 100%
);
```

### Efeitos Visuais

#### Glow/Neon Effect
```css
box-shadow: 0 0 20px rgba(255, 121, 198, 0.6);
box-shadow: 0 20px 60px rgba(255, 121, 198, 0.3);
```

#### Blur/Glass Effect
```css
backdrop-filter: blur(12px);
background: rgba(26, 27, 38, 0.8);
```

## 🎯 Aplicação em Redes Sociais

### Thumbnails do YouTube
- **Fundo**: `#0a0a0f` ou `#1a1b26`
- **Texto Principal**: `#f8f8f2`
- **Destaques**: `#ff79c6` e `#bd93f9`
- **Acentos**: Use gradientes rosa → roxo
- **Efeito**: Adicione glow/neon nos elementos principais

### Stories e Posts
- **Background**: Escuro (`#0a0a0f` ou `#282a36`)
- **Textos**: `#f8f8f2` para títulos, `#6272a4` para descrições
- **CTAs e Botões**: `#ff79c6` ou gradiente rosa → roxo
- **Bordas**: `rgba(255, 121, 198, 0.15)` para sutileza

### Banner de Perfil
- Use gradientes verticais com as cores neon
- Adicione elementos com blur/glass effect
- Mantenha o fundo escuro

## 🔍 Referências e Pesquisa

### Termos para Pesquisar
- **Dracula Theme** - Paleta original
- **Dark Neon Aesthetic**
- **Cyberpunk Color Palette**
- **Neon Pink Purple Theme**
- **Dark Mode Tech Aesthetic**
- **Synthwave Color Scheme** (similar)

### Ferramentas Úteis
- [Dracula Theme Official](https://draculatheme.com/)
- [Coolors.co](https://coolors.co/) - Para criar paletas similares
- [Adobe Color](https://color.adobe.com/) - Para explorar variações

### Extensões e Plugins
- **VS Code**: Dracula Official Theme
- **Figma**: Dracula Theme UI Kit
- **Canva**: Templates com paleta similar

## 📱 Aplicação Prática

### Para YouTube
```
Background: #0a0a0f
Texto Principal: #f8f8f2
Destaques: #ff79c6
Secundário: #bd93f9
Texto Secundário: #6272a4
```

### Para Instagram/Twitter
```
Fundo: #282a36
Cards: rgba(26, 27, 38, 0.95)
Bordas: rgba(255, 121, 198, 0.15)
Acentos: #ff79c6 e #bd93f9
```

## 🎨 Combinações de Cores

### Combinação Principal (Mais Usada)
- Fundo: `#0a0a0f`
- Texto: `#f8f8f2`
- Destaque: `#ff79c6`
- Secundário: `#bd93f9`

### Combinação Alternativa
- Fundo: `#282a36`
- Texto: `#f8f8f2`
- Destaque: `#bd93f9`
- Secundário: `#ff79c6`

## 💡 Dicas de Design

1. **Contraste**: Use sempre texto claro (`#f8f8f2`) em fundos escuros
2. **Hierarquia**: Use `#ff79c6` para elementos importantes, `#6272a4` para secundários
3. **Espaçamento**: Mantenha respiração entre elementos (os cards têm blur/glass)
4. **Gradientes**: Use gradientes rosa → roxo para criar profundidade
5. **Glow**: Adicione sombras neon (`box-shadow`) em elementos interativos
6. **Transparência**: Use `rgba` com `backdrop-filter: blur()` para efeito glass

## 📚 Recursos Adicionais

- **Fontes Recomendadas**: Space Grotesk, Inter, JetBrains Mono
- **Ícones**: Remix Icon (Ri*) funcionam bem com essa estética
- **Padrão Visual**: Dark mode com acentos neon, glassmorphism, gradientes suaves

---

**Criado para**: Pedro Ferreira - Portfólio  
**Data**: 2025  
**Estética**: Dracula Theme / Dark Neon

