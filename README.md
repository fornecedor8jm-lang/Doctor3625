# 📺 Doctor+ | Streaming App para Android TV & TV Box

![Doctor+ Banner](https://files.catbox.moe/u6yu9c.png)

## 📌 Visão Geral do Projeto
O **Doctor+** é uma aplicação web de streaming altamente otimizada, desenvolvida sob medida para dispositivos de tela grande, como **Smart TVs (Android TV, Apple TV, Fire TV)** e **TV Boxes/Chromecast**. O app é dedicado à franquia **Doctor Who**, abrangendo a Série Clássica, Série Moderna, Spin-offs e Especiais Animados de forma totalmente estruturada, limpa e imersiva.

---

## 🛠️ Especificações de Compilação & Metadados do App

A tabela abaixo apresenta os dados técnicos de identificação e controle de versão da build atual do aplicativo:

| Atributo | Detalhes Técnicos |
| :--- | :--- |
| **Nome do App** | Doctor+ |
| **ID do Aplicativo** | `doctor-plus-tv-v2` |
| **Versão Atual** | `v2.1.0-tv-release` |
| **Código da Build (Build Number)** | `#20260706.1` (06 de Julho de 2026) |
| **Porta de Execução** | `3000` (Padrão e exclusiva para ingress de container) |
| **Diretiva de Orientação** | Exclusivamente **Horizontal / Paisagem** (Landscape) |
| **Suporte de Entrada** | Controle Remoto D-Pad (Cima, Baixo, Esquerda, Direita, Enter, Voltar) |
| **Stack Principal** | React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion (React) |

---

## 🎮 Funcionamento do App & Controle Remoto

### 1. Sistema de Foco D-Pad Inteligente
Como o aplicativo é projetado para TVs, **não há ponteiro de mouse ou interação por toque**. Todo o controle é feito através de gerenciamento de estado de foco no React, com classes dinâmicas do Tailwind CSS que alteram o contorno das bordas, escala e brilho dos botões e cards ativos.
*   **Zonas de Foco:** O aplicativo divide a tela em zonas de foco: `sidebar` (abas de navegação), `content` (grade de episódios/cards) e `modal` (pop-up de detalhes e links do reprodutor).
*   **Tratamento de Teclas:** Escuta nativamente os eventos do teclado (`keydown`) gerados pelos botões do controle remoto da TV.

### 2. Atalhos Rápidos de Controle Remoto (Teclas Mapeadas)
Para garantir praticidade total em controles remotos que possuem teclados numéricos ou teclas de funções de canais, implementamos atalhos avançados:

*   **Mudar de Abas (Abas Rápidas):**
    *   Teclas numéricas **`1` a `5`**: Alterna instantaneamente para as respectivas abas secundárias da esquerda.
    *   Teclas **`ChannelUp`** ou **`Tab`** ou botão na tela de **`Mudar Aba ↻`**: Avança para a aba anterior ou subsequente.
    *   Tecla **`ChannelDown`**: Rotaciona ciclicamente entre as abas principais.
*   **Mudar de Temporadas ou Linhas:**
    *   Teclas **`PageUp`** / **`PageDown`** ou botão na tela de **`TEMP ↻`**: Pula diretamente para a linha superior ou inferior das temporadas, facilitando o scroll de listas longas na TV.
*   **Voltar / Fechar:**
    *   Tecla **`Backspace`** / **`Escape`** ou clique no botão **`VOLTAR`** do simulador: Fecha modais de episódios, reprodutores e sinopses em exibição, retornando o foco para a grade.

### 3. Simulador de Controle Remoto Integrado (Para Desenvolvedores / Web)
Para testar o aplicativo diretamente no navegador de computadores antes de instalar na TV, há um **Painel de Controle Remoto Virtual** flutuante no canto esquerdo da tela. Ele simula os comandos físicos do controle, permitindo navegar, selecionar abas, abrir temporadas e acionar links usando cliques do mouse.

---

## 📂 Arquitetura de Desenvolvimento & Estrutura de Arquivos

O projeto segue um padrão estrito de desenvolvimento web modular usando TypeScript:

*   `/index.html` — Arquivo de ponto de entrada HTML do cliente.
*   `/src/main.tsx` — Inicialização do React 19 e montagem do nó DOM principal.
*   `/src/types.ts` — Arquivo de contratos do TypeScript, contendo as definições das interfaces de dados:
    *   `Episode`: Representa um episódio individual com ID, título e link do Google Drive.
    *   `ShowArc`: Define arcos de histórias da série clássica (com metadados e pôsteres exclusivos).
    *   `SeasonInfo`: Mapeamento das pastas do Google Drive das 15 temporadas de Doctor Who.
    *   `SpinOffItem` & `SpecialItem`: Modelagem para as mídias paralelas e episódios comemorativos.
*   `/src/data.ts` — Banco de dados estático e estruturado do catálogo do Doctor+, onde estão todos os links ativos do Google Drive e as referências aos pôsteres hospedados.
*   `/src/App.tsx` — O cérebro do aplicativo. Contém a lógica de controle de estado, captura de teclas D-pad, renderização da interface otimizada para TV, transições e o simulador remoto lateral.
*   `/src/index.css` — Arquivo CSS global que integra o Tailwind CSS v4, define as fontes e implementa regras de acessibilidade e design de alta fidelidade para Smart TVs.

---

## 📺 Catálogo V2 & Pôsteres Exclusivos

Cada seção do catálogo foi refinada na versão 2.0 para exibir pôsteres exclusivos e adequados à sua temática, eliminando placeholders genéricos:

### 🌟 Doctor Who — Série Clássica
*   **Temporada 10:**
    *   *Fronteira no Espaço (Frontier in Space)* ➔ Pôster: `https://files.catbox.moe/6r83y3.png`
    *   *Planeta dos Daleks (Planet of the Daleks)* ➔ Pôster: `https://files.catbox.moe/pje6he.png`
*   **Temporada 12:**
    *   *Robô (Robot)* ➔ Pôster: `https://files.catbox.moe/8pqwj3.png`
    *   *A Arca Espacial (The Ark in Space)* ➔ Pôster: `https://files.catbox.moe/la4ex6.png`
    *   *O Experimento Sontaran (The Sontaran Experiment)* ➔ Pôster: `https://files.catbox.moe/hw6gg8.png`
    *   *Gênese dos Daleks (Genesis of the Daleks)* ➔ Pôster: `https://files.catbox.moe/nuyfc7.png`

### 🚀 Doctor Who — Série Moderna (Nova Era)
*   **Temporada 15:** Pôster: `https://files.catbox.moe/u6yu9c.png`

### 🌌 Spin-Offs
*   **Sarah Jane's Alien Files (2010):** Pôster: `https://files.catbox.moe/9ia7ps.png`
*   **Torchwood (Temporadas 1 a 4):** Pôster: `https://files.catbox.moe/hnixyi.png`

### 🎁 Especiais e Animações
*   **The Evil of the Daleks (Animação):** Pôster: `https://files.catbox.moe/s9hgn6.jpg`
*   **Uma Aventura no Espaço e Tempo (2013):** Pôster: `https://files.catbox.moe/3a11qz.jpg`
*   **Especiais de 60 Anos (2023):**
    *   *A Besta Estelar (The Star Beast)* ➔ Pôster: `https://files.catbox.moe/47bnqg.jpg`
    *   *Wild Blue Yonder* ➔ Pôster: `https://files.catbox.moe/q690wm.jpg`
    *   *The Giggle* ➔ Pôster: `https://files.catbox.moe/fxit28.jpg`

### 🗂️ Pastas Gerais de Temporadas (Google Drive)
*   Exibe atalhos diretos do Drive para todas as **15 Temporadas** utilizando o Pôster Geral de Temporadas: `https://files.catbox.moe/ebpbci.jpeg`.

---

## 📺 Integridade de CSS e Design para Smart TVs

Para garantir que o Doctor+ rode perfeitamente em telas de alta definição e em navegadores nativos de Smart TV, os seguintes princípios de CSS e layout foram adotados:

1.  **Impedimento de Scroll Vertical Indesejado:** O layout principal utiliza altura total fixa da tela (`h-screen overflow-hidden`), dividida em uma barra lateral estática e uma área de conteúdo com scroll interno apenas nas linhas. Isso impede o rolamento quebrado que costuma ocorrer em browsers de TV Box.
2.  **Altíssimo Contraste:** Uso de fundos pretos e azuis profundos (`bg-slate-950`, `bg-black`) com textos brancos e azuis ciano brilhantes, garantindo que o texto permaneça legível a mais de 3 metros de distância.
3.  **Tamanho de Alvos de Toque / Foco:** Cards e botões possuem estados expandidos e bordas largas azuis brilhantes (`border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-[1.03]`) que saltam aos olhos do usuário para identificar instantaneamente onde o foco está localizado.
4.  **Imagens Anti-Corte:** Uso da propriedade `object-cover` nas tags de imagem com a propriedade `referrerPolicy="no-referrer"` ativada, garantindo que as imagens carreguem com segurança do Catbox sem quebrar as diretivas de proteção de imagem.
5.  **Motion Eficiente:** Animações sutis e leves utilizando o pacote `motion`, garantindo desempenho fluído mesmo em processadores integrados de Smart TVs de baixa performance.

---

## 🚀 Como Executar e Buildar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18+) e o **npm** instalados.

### Passos para Configuração

1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Iniciar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor iniciará na porta `3000` (disponível em `http://localhost:3000`).

3.  **Verificar erros de linting e tipos TypeScript:**
    ```bash
    npm run lint
    ```

4.  **Gerar build de produção para Smart TVs:**
    ```bash
    npm run build
    ```
    Isso gerará os arquivos estáticos compilados e minificados dentro da pasta `/dist`, prontos para serem servidos ou empacotados em um aplicativo nativo para Android TV (utilizando Cordova, Capacitor ou WebView nativa).

---

## 📦 Conversão para APK (Android TV & TV Box)

O projeto já vem totalmente pré-configurado com os arquivos necessários para ser transformado em um aplicativo nativo (`.apk`) instalável em Smart TVs e Android TV Boxes.

### 1. Arquivos de Configuração Inclusos
*   **`config.xml`**: Configurações oficiais do **Cordova** definindo o ID (`com.doctor.plus.tv`), orientação fixada em paisagem (`landscape`), tela cheia (`fullscreen`) e parâmetros de hardware de aceleração para Smart TVs.
*   **`capacitor.config.json`**: Configurações oficiais do **Capacitor** apontando para o diretório de build web (`dist`) e configurando esquemas estáveis de carregamento de páginas via WebView no Android.
*   **`android/app/src/main/AndroidManifest.xml`**: Arquivo manifesto do Android especificamente otimizado para TVs:
    *   Habilita permissões de Internet para o streaming de vídeos.
    *   Sinaliza `android.hardware.touchscreen` como **não obrigatório** (`android:required="false"`), permitindo que o app seja compatível com controles remotos comuns e listado na Google Play Store para TVs.
    *   Suporta a categoria `android.intent.category.LEANBACK_LAUNCHER` para aparecer nativamente no carrossel de aplicativos das Smart TVs e Google TV.
*   **`android/app/build.gradle`**: Configurações de compilação SDK (`minSdkVersion 21` para cobrir 98%+ das Smart TVs e TV Boxes do mercado, e `targetSdkVersion 34` para máxima conformidade com a Google Play Store).

### 2. Passo a Passo para Gerar o APK com Capacitor

Siga os comandos abaixo na raiz do seu projeto para gerar o APK nativo utilizando o Capacitor:

```bash
# 1. Certifique-se de ter gerado a build de produção web
npm run build

# 2. Inicialize o projeto Capacitor com as plataformas necessárias (caso faça do zero)
npx cap init Doctor+ com.doctor.plus.tv --web-dir=dist

# 3. Adicione a plataforma Android ao seu projeto
npx cap add android

# 4. Copie os arquivos web compilados (/dist) para a pasta do Android nativo
npx cap copy

# 5. Abra o projeto no Android Studio para compilar e assinar o seu APK final
npx cap open android
```

Dentro do **Android Studio**, vá em **Build > Build Bundle(s) / APK(s) > Build APK(s)** e seu arquivo `.apk` estará pronto para ser copiado para um pendrive e instalado na sua TV!

### 3. Passo a Passo para Gerar o APK com Cordova

Se preferir utilizar o Cordova para compilação via CLI rápida:

```bash
# 1. Instale o Cordova globalmente
npm install -g cordova

# 2. Adicione a plataforma Android ao projeto Cordova
cordova platform add android

# 3. Compile diretamente o APK de depuração (Debug)
cordova build android

# 4. Ou compile o APK otimizado e assinado para produção (Release)
cordova build android --release
```

---

Este projeto representa o estado da arte em termos de usabilidade de web apps para Smart TVs, aliando beleza, simplicidade e precisão no controle remoto! 🚀
