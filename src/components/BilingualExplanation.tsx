import { useState } from "react";
import { Languages, ChevronDown, Sparkles } from "lucide-react";

interface BilingualExplanationProps {
  topicTitle: string;
  gujaratiExplanation?: string;
  hindiExplanation?: string;
}

const BILINGUAL_KNOWLEDGE_BASE: Record<string, { gu: string; hi: string }> = {
  // OOPJ
  "dynamic-dispatch": {
    gu: "ડાયનેમિક મેથડ ડિસ્પેચ એટલે રનટાઇમ પર જાવા નક્કી કરે છે કે કયો મેથડ રન કરવો. પેરન્ટ ક્લાસના રેફરન્સમાં જ્યારે ચાઇલ્ડનો ઓબ્જેક્ટ મૂકો (Parent p = new Child()), ત્યારે ચાઇલ્ડનો ઓવરરાઇડ થયેલ મેથડ જ કોલ થશે.",
    hi: "डायनामिक मेथड डिस्पैच का मतलब है कि रनटाइम पर जावा यह तय करता है कि कौन सा मेथड चलेगा। जब पेरेंट रेफरेंस में चाइल्ड का ऑब्जेक्ट होता है (Parent p = new Child()), तो चाइल्ड क्लास का ओवरराइड मेथड ही कॉल होता है।",
  },
  "super-this": {
    gu: "super() થી પેરન્ટ ક્લાસનું કન્સ્ટ્રક્ટર કોલ થાય અને this() થી પોતાના ક્લાસનું બીજું કન્સ્ટ્રક્ટર કોલ થાય. યાદ રાખો કે બંને હંમેશા કન્સ્ટ્રક્ટરની પહેલી જ લાઇનમાં હોવા જોઈએ.",
    hi: "super() से पैरेंट क्लास का कंस्ट्रक्टर कॉल होता है और this() से अपनी ही क्लास का दूसरा कंस्ट्रक्टर। ध्यान रखें कि ये दोनों हमेशा कंस्ट्रक्टर की पहली ही लाइन में होने चाहिए।",
  },
  // DSA
  "circular-queue": {
    gu: "સાદી ક્યૂમાં આગળથી એલિમેન્ટ નીકળી ગયા પછી પણ જગ્યા વેડફાય છે. સર્ક્યુલર ક્યૂમાં મોડ્યુલો ((rear + 1) % MAX) વાપરીને છેલ્લી જગ્યા ફરી પહેલી જગ્યા સાથે જોડાઈ જાય છે, જેથી મેમરી બચી જાય છે.",
    hi: "लीनियर कतार में फ्रंट से एलिमेंट हटने पर भी मेमोरी बर्बाद होती है। सर्कुलर कतार में मॉड्यूलो अरिथमेटिक ((rear + 1) % MAX) का उपयोग करके आखिरी इंडेक्स सीधे पहले इंडेक्स से जुड़ जाता है।",
  },
  "avl-tree": {
    gu: "AVL ટ્રી એક બેલેન્સ્ડ બાઈનરી સર્ચ ટ્રી છે. દરેક નોડનો બેલેન્સ ફેક્ટર (ડાબી હાઈટ - જમણી હાઈટ) હંમેશા -1, 0 અથવા +1 હોવો જોઈએ. જો બેલેન્સ બગડે તો LL, RR, LR, કે RL રોટેશન કરી સરખું કરાય છે.",
    hi: "AVL ट्री एक बैलेंस्ड बाइनरी सर्च ट्री है। हर नोड का बैलेंस फैक्टर (लेफ्ट हाइट - राइट हाइट) केवल -1, 0 या +1 होना चाहिए। असंतुलन होने पर LL, RR, LR या RL रोटेशन द्वारा ट्री को फिर से बैलेंस किया जाता है।",
  },
  // CA
  "booth-multiplication": {
    gu: "બૂથ્સ અલ્ગોરિધમ સાઈન્ડ (નેગેટિવ અને પોઝિટિવ) નંબર્સના ગુણાકાર માટે વપરાય છે. તેમાં 2's complement અને Arithmetic Shift Right (ASR) નો ઉપયોગ થાય છે જેથી નેગેટિવ સાઈન સચવાઈ રહે.",
    hi: "बूथ एल्गोरिदम साइन्ड (पॉजिटिव और नेगेटिव) नंबर्स का गुणा करने के लिए प्रयोग होता है। इसमें अरिथमेटिक शिफ्ट राइट (ASR) और 2's कॉम्प्लिमेंट से नेगेटिव साइन सुरक्षित रहता है।",
  },
  // DBMS
  "normalization-bcnf": {
    gu: "BCNF (Boyce-Codd Normal Form) એટલે કે ડેટાબેઝના દરેક ફંક્શનલ ડીપેન્ડન્સી (X -> Y) માં X હંમેશા સુપર કી (Superkey) જ હોવી જોઈએ. આનાથી બધી જ નકામી ડુપ્લિકેટ માહિતી દૂર થઈ જાય છે.",
    hi: "BCNF (बॉयस-कॉड नॉर्मल फॉर्म) का नियम है कि हर फंक्शनल डिपेंडेंसी (X -> Y) में X अनिवार्य रूप से सुपरकी ही होना चाहिए। इससे टेबल का रिडंडेंट डेटा पूरी तरह समाप्त हो जाता है।",
  },
  // CONMP
  "newton-raphson": {
    gu: "ન્યૂટન-રેફસન મેથડ સ્પીડમાં રૂટ શોધવા માટે ટેન્જેન્ટ (ઢાળ) વાપરે છે. આમાં ક્વોડ્રેટિક કન્વર્જન્સ (p = 2) હોય છે, એટલે કે દરેક સ્ટેપ પર સાચા આંકડા ડબલ થઈ જાય છે.",
    hi: "न्यूटन-रेफसन विधि तेजी से रूट खोजने के लिए स्पर्शरेखा (टैंजेंट) का उपयोग करती है। इसमें क्वाड्रेटिक कन्वर्जेंस (p = 2) होता है, जिससे हर स्टेप में सटीक दशमलव अंक दोगुने हो जाते हैं।",
  },
};

export function BilingualExplanation({
  topicTitle,
  gujaratiExplanation,
  hindiExplanation,
}: BilingualExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"gu" | "hi">("gu");

  // Lookup in default knowledge base if not explicitly passed
  let gu = gujaratiExplanation;
  let hi = hindiExplanation;

  if (!gu || !hi) {
    const key = Object.keys(BILINGUAL_KNOWLEDGE_BASE).find((k) =>
      topicTitle.toLowerCase().includes(k.replace("-", " ")) ||
      topicTitle.toLowerCase().includes(k)
    );
    if (key) {
      gu = gu || BILINGUAL_KNOWLEDGE_BASE[key].gu;
      hi = hi || BILINGUAL_KNOWLEDGE_BASE[key].hi;
    }
  }

  // If still no content, provide helpful concept summary
  if (!gu && !hi) {
    gu = `${topicTitle} - સરળ ગુજરાતી સમજૂતી: આ ટોપિકના મુખ્ય પોઇન્ટ્સ અને પરીક્ષાના નિયમો યાદ રાખો. ફોર્મ્યુલા અને ડ્રાય રન પરીક્ષામાં માર્ક્સ મેળવવા માટે અનિવાર્ય છે.`;
    hi = `${topicTitle} - सरल हिंदी व्याख्या: इस टॉपिक के प्रमुख कॉन्सेप्ट्स और परीक्षा नियमों को याद रखें। यूनिवर्सिटी परीक्षा में फॉर्मूला और कोड ड्राई रन सबसे ज्यादा स्कोरिंग हैं।`;
  }

  return (
    <div className="rounded-2xl border border-indigo-200/60 dark:border-indigo-900/40 bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/30 dark:from-indigo-950/20 dark:via-background dark:to-purple-950/10 p-3.5 my-3 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400 hover:opacity-80 transition-opacity cursor-pointer font-display"
        >
          <Languages className="h-4 w-4" />
          <span>Explain Simply in Gujarati / Hindi (સરળ દેશી ભાષામાં)</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="flex rounded-lg bg-indigo-100/60 dark:bg-indigo-950/60 p-0.5 text-[11px] font-bold">
            <button
              onClick={() => setLang("gu")}
              className={`px-2 py-0.5 rounded-md transition-all ${
                lang === "gu"
                  ? "bg-white dark:bg-card text-indigo-600 dark:text-indigo-300 shadow-2xs"
                  : "text-muted-foreground"
              }`}
            >
              ગુજરાતી
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-2 py-0.5 rounded-md transition-all ${
                lang === "hi"
                  ? "bg-white dark:bg-card text-indigo-600 dark:text-indigo-300 shadow-2xs"
                  : "text-muted-foreground"
              }`}
            >
              हिन्दी
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="mt-2.5 pt-2 border-t border-indigo-100 dark:border-indigo-900/40 text-xs text-foreground/90 leading-relaxed animate-fade-in font-medium">
          <div className="flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="font-sans">
              {lang === "gu" ? gu : hi}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
