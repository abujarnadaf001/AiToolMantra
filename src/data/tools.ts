export interface ToolData {
  id: string;
  name: string;
  category: string;
  tag: string;
  emoji: string;
  desc: string;
  page: string;
}

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  count: number;
  page: string;
}

export const TOOLS_DATA: ToolData[] = [
  // NLP - Text Generation
  { id:'chatgpt',      name:'ChatGPT',          category:'nlp',        tag:'freemium',    emoji:'🤖', desc:'Advanced conversational AI by OpenAI for writing, coding, analysis and more.',         page:'tool-chatgpt.html' },
  { id:'jasper-ai',    name:'Jasper AI',         category:'nlp',        tag:'paid',        emoji:'✍️', desc:'AI content platform for marketers — blogs, ads, social media at scale.',              page:'tool-jasper-ai.html' },
  { id:'copy-ai',      name:'Copy.ai',           category:'nlp',        tag:'freemium',    emoji:'📝', desc:'AI copywriting tool for ads, emails, product descriptions and social posts.',         page:'tool-copy-ai.html' },
  { id:'writesonic',   name:'Writesonic',        category:'nlp',        tag:'freemium',    emoji:'⚡', desc:'SEO-friendly AI writer with SurferSEO integration for blogs and landing pages.',      page:'tool-writesonic.html' },
  { id:'rytr',         name:'Rytr',              category:'nlp',        tag:'freemium',    emoji:'🖊️', desc:'Affordable AI writing assistant for freelancers and small businesses.',                page:'tool-rytr.html' },
  { id:'anyword',      name:'Anyword',           category:'nlp',        tag:'paid',        emoji:'📊', desc:'AI copywriting with predictive performance analytics for higher conversions.',         page:'tool-anyword.html' },
  { id:'copysmith',    name:'Copysmith',         category:'nlp',        tag:'paid',        emoji:'🏭', desc:'Enterprise AI content generation for ecommerce and marketing teams.',                  page:'tool-copysmith.html' },
  { id:'sudowrite',    name:'Sudowrite',         category:'nlp',        tag:'paid',        emoji:'📖', desc:'AI writing partner for fiction authors — brainstorm, rewrite, expand.',               page:'tool-sudowrite.html' },
  // NLP - Text Analysis
  { id:'google-nlp',   name:'Google Cloud NLP',  category:'nlp',        tag:'freemium',    emoji:'🔍', desc:'Sentiment analysis, entity recognition and syntax analysis via Google Cloud.',         page:'tool-google-nlp.html' },
  { id:'nltk',         name:'NLTK',              category:'nlp',        tag:'free',        emoji:'🐍', desc:'Open-source Python library for NLP — tokenization, stemming, parsing.',               page:'tool-nltk.html' },
  { id:'spacy',        name:'spaCy',             category:'nlp',        tag:'open-source', emoji:'🔬', desc:'Industrial-strength NLP library for Python with fast, accurate models.',               page:'tool-spacy.html' },
  { id:'textrazor',    name:'TextRazor',         category:'nlp',        tag:'freemium',    emoji:'🧩', desc:'Deep text analysis API — entities, relations, topics and categories.',                 page:'tool-textrazor.html' },
  { id:'monkeylearn',  name:'MonkeyLearn',       category:'nlp',        tag:'freemium',    emoji:'🐒', desc:'No-code text analysis platform for sentiment, classification and extraction.',         page:'tool-monkeylearn.html' },
  { id:'stanford-nlp', name:'Stanford CoreNLP',  category:'nlp',        tag:'open-source', emoji:'🎓', desc:'NLP toolkit for sentiment analysis, NER and dependency parsing from Stanford.',        page:'tool-stanford-corenlp.html' },
  // NLP - Translation
  { id:'deepl',        name:'DeepL',             category:'nlp',        tag:'freemium',    emoji:'🌐', desc:'High-quality neural machine translation — more accurate than Google Translate.',       page:'tool-deepl.html' },
  { id:'google-translate', name:'Google Translate', category:'nlp',    tag:'free',        emoji:'🗺️', desc:'Free instant translation for 100+ languages by Google.',                              page:'tool-google-translate.html' },
  { id:'amazon-translate', name:'Amazon Translate', category:'nlp',    tag:'freemium',    emoji:'📦', desc:'Neural machine translation service from AWS for real-time and batch translation.',     page:'tool-amazon-translate.html' },
  { id:'microsoft-translator', name:'Microsoft Translator', category:'nlp', tag:'freemium', emoji:'🪟', desc:'Cloud-based translation API supporting 100+ languages from Microsoft Azure.',       page:'tool-microsoft-translator.html' },
  // NLP - Chatbots
  { id:'dialogflow',   name:'Dialogflow',        category:'nlp',        tag:'freemium',    emoji:'💬', desc:'Google\'s NLU platform for building conversational interfaces and chatbots.',          page:'tool-dialogflow.html' },
  { id:'rasa',         name:'Rasa',              category:'nlp',        tag:'open-source', emoji:'🤝', desc:'Open-source framework for building contextual AI assistants and chatbots.',            page:'tool-rasa.html' },
  { id:'botpress',     name:'Botpress',          category:'nlp',        tag:'open-source', emoji:'🤖', desc:'Open-source conversational AI platform for building enterprise chatbots.',             page:'tool-botpress.html' },
  { id:'manychat',     name:'ManyChat',          category:'nlp',        tag:'freemium',    emoji:'📱', desc:'Chat marketing platform for Instagram, WhatsApp and Facebook Messenger automation.',  page:'tool-manychat.html' },
  { id:'tidio',        name:'Tidio',             category:'nlp',        tag:'freemium',    emoji:'🎯', desc:'Live chat and AI chatbot platform for customer service and sales automation.',         page:'tool-tidio.html' },
  // ML Tools
  { id:'tensorflow',   name:'TensorFlow',        category:'ml',         tag:'open-source', emoji:'🔷', desc:'Google\'s open-source ML framework for building and deploying ML models at scale.',    page:'tool-tensorflow.html' },
  { id:'pytorch',      name:'PyTorch',           category:'ml',         tag:'open-source', emoji:'🔥', desc:'Facebook\'s flexible deep learning framework favored by researchers worldwide.',       page:'tool-pytorch.html' },
  { id:'keras',        name:'Keras',             category:'ml',         tag:'open-source', emoji:'🧠', desc:'High-level neural networks API running on top of TensorFlow — easy to use.',          page:'tool-keras.html' },
  { id:'huggingface',  name:'Hugging Face',      category:'ml',         tag:'freemium',    emoji:'🤗', desc:'The AI community hub — thousands of pretrained models, datasets and spaces.',          page:'tool-huggingface.html' },
  { id:'datarobot',    name:'DataRobot',         category:'ml',         tag:'paid',        emoji:'🤖', desc:'Enterprise AutoML platform for building, deploying and managing ML models.',           page:'tool-datarobot.html' },
  { id:'google-automl',name:'Google AutoML',     category:'ml',         tag:'freemium',    emoji:'☁️', desc:'Train high-quality custom ML models with minimal ML expertise via Google Cloud.',      page:'tool-google-cloud-automl.html' },
  { id:'sagemaker',    name:'Amazon SageMaker',  category:'ml',         tag:'paid',        emoji:'🚀', desc:'Fully managed ML service to build, train and deploy models on AWS infrastructure.',    page:'tool-amazon-sagemaker.html' },
  { id:'mlflow',       name:'MLflow',            category:'ml',         tag:'open-source', emoji:'📈', desc:'Open-source platform for ML lifecycle — tracking, packaging and deploying models.',    page:'tool-mlflow.html' },
  { id:'kubeflow',     name:'Kubeflow',          category:'ml',         tag:'open-source', emoji:'☸️', desc:'ML toolkit for Kubernetes — deploy scalable ML workflows on any cloud.',               page:'tool-kubeflow.html' },
  { id:'vertex-ai',    name:'Google Vertex AI',  category:'ml',         tag:'paid',        emoji:'🌟', desc:'Unified ML platform from Google Cloud for building and deploying ML models.',          page:'tool-google-vertex-ai.html' },
  // Healthcare
  { id:'aidoc',        name:'Aidoc',             category:'healthcare', tag:'paid',        emoji:'🏥', desc:'AI-powered radiology platform for real-time detection of critical conditions.',        page:'aidoc.html' },
  { id:'pathai',       name:'PathAI',            category:'healthcare', tag:'paid',        emoji:'🔬', desc:'AI-powered pathology platform improving diagnostic accuracy for cancer detection.',     page:'pathai.html' },
  { id:'tempus',       name:'Tempus',            category:'healthcare', tag:'paid',        emoji:'🧬', desc:'AI platform for precision medicine using clinical and molecular data analysis.',        page:'tempus.html' },
  { id:'flatiron',     name:'Flatiron Health',   category:'healthcare', tag:'paid',        emoji:'💊', desc:'Oncology-focused real-world evidence platform powered by AI and ML.',                  page:'flatiron-health.html' },
  { id:'zebra',        name:'Zebra Medical',     category:'healthcare', tag:'paid',        emoji:'🦓', desc:'AI algorithms for automated medical imaging analysis and early disease detection.',     page:'zebra-medical.html' },
  // Finance
  { id:'algo-trading', name:'Algorithmic Trading AI', category:'finance', tag:'paid',     emoji:'💹', desc:'AI-powered algorithmic trading systems for automated market analysis and execution.',  page:'algorithmic-trading.html' },
  { id:'predictive',   name:'Predictive Analytics',   category:'finance', tag:'freemium', emoji:'📊', desc:'AI-driven predictive analytics tools for financial forecasting and risk assessment.',   page:'predictive-analytics.html' },
  // Creative
  { id:'music-gen',    name:'Music Generation AI',    category:'creative', tag:'freemium', emoji:'🎵', desc:'AI tools for generating original music, melodies and soundscapes automatically.',      page:'music-generation.html' },
];

export const CATEGORIES: CategoryData[] = [
  { id:'nlp',        name:'NLP & Language',    icon:'MessageSquare', count:22, page:'text-generation.html' },
  { id:'ml',         name:'Machine Learning',  icon:'Brain',         count:10, page:'automl.html' },
  { id:'healthcare', name:'Healthcare AI',     icon:'Stethoscope',   count:8,  page:'diagnostic-tools.html' },
  { id:'finance',    name:'Finance AI',        icon:'LineChart',     count:6,  page:'algorithmic-trading.html' },
  { id:'creative',   name:'Creative Arts',     icon:'Palette',       count:7,  page:'music-generation.html' },
  { id:'analytics',  name:'Analytics',         icon:'BarChart3',     count:5,  page:'predictive-analytics.html' },
  { id:'cybersec',   name:'Cybersecurity',     icon:'ShieldCheck',   count:4,  page:'index.html' },
  { id:'education',  name:'Education AI',      icon:'GraduationCap', count:5,  page:'index.html' },
  { id:'gaming',     name:'Gaming AI',         icon:'Gamepad2',      count:4,  page:'index.html' },
  { id:'autonomous', name:'Autonomous Systems',icon:'Car',           count:4,  page:'index.html' },
  { id:'marketing',  name:'Marketing AI',      icon:'Megaphone',     count:5,  page:'index.html' },
  { id:'customer',   name:'Customer Service',  icon:'Headphones',    count:5,  page:'index.html' },
];
