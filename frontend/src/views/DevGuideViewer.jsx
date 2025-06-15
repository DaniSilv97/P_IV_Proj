import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
  faBook,
  faCode,
  faFileText,
  faCog,
  faBolt,
  faShield
} from '@fortawesome/free-solid-svg-icons';

const DevGuideViewer = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    architecture: false,
    components: false,
    patterns: false,
    styling: false,
    api: false,
    socket: false,
    guidelines: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({ id, title, icon, children }) => {
    const isExpanded = expandedSections[id];
    
    return (
      <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 flex items-center justify-between transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={icon} className="w-5 h-5 text-main" />
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>
          <FontAwesomeIcon 
            icon={isExpanded ? faChevronDown : faChevronRight} 
            className="w-5 h-5 text-gray-500" 
          />
        </button>
        
        {isExpanded && (
          <div className="px-6 py-4 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

  const CodeBlock = ({ children }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{children}</code>
    </pre>
  );

  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
      <div className="flex items-center space-x-2 mb-2">
        <FontAwesomeIcon icon={icon} className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-gray-800">{title}</h4>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen text-slate-700">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-main to-main-hover bg-clip-text text-transparent mb-4">
          SmartSprout Solutions
        </h1>
        <p className="text-xl text-gray-600 mb-2">React Developer Guide</p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">React 18</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Tailwind CSS</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Socket.IO</span>
        </div>
      </div>

      {/* Project Overview */}
      <Section id="overview" title="Project Overview" icon={faBook}>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            <strong>SmartSprout Solutions</strong> é uma plataforma de gestão agrícola que oferece aos 
            agricultores monitoramento meteorológico, gestão de campos e insights acionáveis. 
            O frontend é construído com React usando práticas modernas de desenvolvimento.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <FeatureCard 
              icon={faShield} 
              title="Autenticação" 
              description="Sistema completo de login/registro com proteção de rotas" 
            />
            <FeatureCard 
              icon={faBolt} 
              title="Tempo Real" 
              description="Dados meteorológicos atualizados via Socket.IO" 
            />
            <FeatureCard 
              icon={faCog} 
              title="Gerenciamento" 
              description="CRUD completo para campos agrícolas" 
            />
            <FeatureCard 
              icon={faFileText} 
              title="Visualização" 
              description="Gráficos interativos de dados meteorológicos" 
            />
          </div>
        </div>
      </Section>

      {/* Architecture */}
      <Section id="architecture" title="Architecture" icon={faCog}>
        <div className="space-y-4">
          <p className="text-gray-700">
            A aplicação segue uma arquitetura baseada em componentes com clara separação de responsabilidades:
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Camadas da Arquitetura:</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <FontAwesomeIcon icon={faShield} className="text-main-hover mr-2 w-4" />
                <strong>Authentication Layer</strong> - AuthContext
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faBolt} className="text-main-hover mr-2 w-4" />
                <strong>Real-time Communication</strong> - SocketProvider
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCode} className="text-main-hover mr-2 w-4" />
                <strong>Routing Layer</strong> - React Router
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faCog} className="text-main-hover mr-2 w-4" />
                <strong>UI Components</strong> - Componentes reutilizáveis
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon icon={faFileText} className="text-main-hover mr-2 w-4" />
                <strong>Views/Pages</strong> - Páginas da aplicação
              </li>
            </ul>
          </div>

          <CodeBlock>
{`Frontend (React)
├── Authentication Layer (AuthContext)
├── Real-time Communication (SocketProvider)
├── Routing Layer (React Router)
├── UI Components
└── Views/Pages`}
          </CodeBlock>
        </div>
      </Section>

      {/* Core Components */}
      <Section id="components" title="Core Components" icon={faCode}>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-blue-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                BaseButton
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Componente de botão reutilizável com estilização consistente e efeitos hover.
              </p>
              <CodeBlock>
{`<BaseButton 
  onClick={handleClick} 
  className="additional-classes"
>
  Button Text
</BaseButton>`}
              </CodeBlock>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faFileText} className="mr-2" />
                WeatherDisplay
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Exibe informações meteorológicas atuais usando dados do SocketProvider.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faBolt} className="text-green-500 mr-1 w-3" /> 
                  Atualizações em tempo real
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCog} className="text-green-500 mr-1 w-3" /> 
                  Ícones meteorológicos
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faShield} className="text-green-500 mr-1 w-3" /> 
                  Tratamento de erros
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-purple-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faShield} className="mr-2" />
                RouteAuth
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Três componentes de proteção de rotas baseados em autenticação.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faShield} className="text-red-500 mr-1 w-3" /> 
                  ProtectedRoute - Requer autenticação
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faCode} className="text-blue-500 mr-1 w-3" /> 
                  PublicRoute - Apenas não autenticados
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faBook} className="text-green-500 mr-1 w-3" /> 
                  OpenRoute - Sem restrições
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-orange-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faFileText} className="mr-2" />
                ModalBase
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Wrapper de modal que fornece overlay consistente e centralização.
              </p>
              <CodeBlock>
{`<ModalBase>
  <div className="modal-content">
    // Conteúdo do modal
  </div>
</ModalBase>`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </Section>

      {/* Context Providers */}
      <Section id="patterns" title="Context Providers" icon={faBolt}>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-main mb-2 flex items-center">
              <FontAwesomeIcon icon={faShield} className="mr-2" />
              AuthContext
            </h4>
            <p className="text-gray-700 mb-3">
              Gerencia estado de autenticação em toda a aplicação com validação automática de sessão.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Estados:</strong>
                <ul className="text-gray-600 ml-4">
                  <li>• user: Objeto do usuário ou null</li>
                  <li>• checkedSession: Status da verificação</li>
                </ul>
              </div>
              <div>
                <strong>Métodos:</strong>
                <ul className="text-gray-600 ml-4">
                  <li>• setUser: Atualiza estado do usuário</li>
                  <li>• Validação automática de sessão</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <FontAwesomeIcon icon={faBolt} className="mr-2" />
              SocketProvider
            </h4>
            <p className="text-gray-700 mb-3">
              Gerencia conexão Socket.IO e dados em tempo real com ciclo de vida controlado.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Características:</strong>
                <ul className="text-gray-600 ml-4">
                  <li>• Conexão automática quando autenticado</li>
                  <li>• Cleanup automático na desmontagem</li>
                </ul>
              </div>
              <div>
                <strong>Dados:</strong>
                <ul className="text-gray-600 ml-4">
                  <li>• socket: Instância Socket.IO</li>
                  <li>• weather: Dados meteorológicos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Styling */}
      <Section id="styling" title="Styling Approach" icon={faCog}>
        <div className="space-y-4">
          <p className="text-gray-700">
            O projeto utiliza <strong>Tailwind CSS</strong> com configuração customizada para cores do tema.
          </p>
          
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faCog} className="mr-2 text-main" />
              Cores Customizadas:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2"></div>
                <code className="text-xs">main: #4caf50</code>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-700 rounded-lg mx-auto mb-2"></div>
                <code className="text-xs">main-hover: #388e3c</code>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-200 rounded-lg mx-auto mb-2"></div>
                <code className="text-xs">secondary: #a8e6cf</code>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-300 rounded-lg mx-auto mb-2"></div>
                <code className="text-xs">secondary-hover: #81c784</code>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <FontAwesomeIcon icon={faBolt} className="mr-2" />
              Animações Customizadas:
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Fade effects para transições suaves</li>
              <li>• Slide transitions para modais</li>
              <li>• Floating elements para efeitos visuais</li>
              <li>• Loading spinners para feedback</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* API Integration */}
      <Section id="api" title="API Integration" icon={faCode}>
        <div className="space-y-4">
          <p className="text-gray-700">
            Todas as requisições da API incluem <code className="bg-gray-100 px-2 py-1 rounded">credentials: {"'include'"}</code> para cookies de sessão.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-main mb-2 flex items-center">
                <FontAwesomeIcon icon={faShield} className="mr-2" />
                Autenticação
              </h4>
              <ul className="text-sm space-y-1">
                <li><code>POST /api/login</code> - Login do usuário</li>
                <li><code>POST /api/register</code> - Registro</li>
                <li><code>POST /api/logout</code> - Logout</li>
                <li><code>GET /api/session</code> - Validação de sessão</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Gerenciamento de Campos
              </h4>
              <ul className="text-sm space-y-1">
                <li><code>GET /api/fields</code> - Listar campos</li>
                <li><code>GET /api/fields/:id</code> - Campo específico</li>
                <li><code>POST /api/fields/create</code> - Criar campo</li>
                <li><code>DELETE /api/fields/:id</code> - Deletar campo</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Socket.IO */}
      <Section id="socket" title="Socket.IO Integration" icon={faBolt}>
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
              <FontAwesomeIcon icon={faBolt} className="mr-2" />
              Gerenciamento de Conexão
            </h4>
            <CodeBlock>
{`// Conexão automática quando usuário faz login
socketRef.current = io('http://localhost:5000', {
  withCredentials: true,
});`}
            </CodeBlock>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-semibold text-green-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faBolt} className="mr-2" />
                connect
              </h5>
              <p className="text-sm text-gray-600">Conexão estabelecida</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-semibold text-red-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faBolt} className="mr-2" />
                disconnect
              </h5>
              <p className="text-sm text-gray-600">Conexão perdida</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h5 className="font-semibold text-blue-600 mb-2 flex items-center">
                <FontAwesomeIcon icon={faFileText} className="mr-2" />
                weather_update
              </h5>
              <p className="text-sm text-gray-600">Dados meteorológicos em tempo real</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Development Guidelines */}
      <Section id="guidelines" title="Development Guidelines" icon={faBook}>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faShield} className="mr-2" />
                  Melhores Práticas
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Sempre usar PropTypes para validação</li>
                  <li>• Seguir convenções de nomenclatura</li>
                  <li>• Implementar error boundaries</li>
                  <li>• Usar componentes funcionais com hooks</li>
                  <li>• Cleanup adequado em useEffect</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Diretrizes de Estilo
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Usar classes utilitárias do Tailwind</li>
                  <li>• CSS customizado apenas quando necessário</li>
                  <li>• Manter princípios de design responsivo</li>
                  <li>• Usar elementos HTML semânticos</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faCode} className="mr-2" />
                  Padrões Comuns
                </h4>
                <CodeBlock>
{`// Form handling
const [formData, setFormData] = useState({
  field: '',
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};`}
                </CodeBlock>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                  <FontAwesomeIcon icon={faFileText} className="mr-2" />
                  Métricas de Qualidade
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faBolt} className="text-green-500 mr-1 w-3" /> 
                    Reutilização: Excelente
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faBook} className="text-green-500 mr-1 w-3" /> 
                    Legibilidade: Excelente
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCog} className="text-yellow-500 mr-1 w-3" /> 
                    Manutenibilidade: Boa
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faFileText} className="text-yellow-500 mr-1 w-3" /> 
                    Performance: Boa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <div className="flex justify-center items-center space-x-2 mb-2">
          <FontAwesomeIcon icon={faBook} className="text-blue-500" />
          <p>Esta documentação serve como referência completa para entender, manter e expandir o projeto SmartSprout Solutions.</p>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <FontAwesomeIcon icon={faCode} className="text-red-500" />
          <p>Desenvolvido com ❤️ usando React e melhores práticas de desenvolvimento.</p>
        </div>
      </div>
    </div>
  );
};

export default DevGuideViewer;