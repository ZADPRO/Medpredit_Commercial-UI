import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAccordionGroup,
  IonAccordion,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useParams } from "react-router";
import { chevronBack } from "ionicons/icons";

const KnowAbout: React.FC = () => {
  const { sentDisease } = useParams<{ sentDisease: string }>();

  // Your QA data
  const qaData = [
    {
      langCode: "1", // English
      diseases: [
        {
          id: "1",
          disease: "Diabetes",
          qa: [
            {
              question: "What is diabetes?",
              answer:
                "Diabetes is a chronic condition that affects how your body turns food into energy.",
            },
            {
              question: "What are the symptoms of diabetes?",
              answer:
                "Common symptoms include increased thirst, frequent urination, extreme fatigue, and blurry vision.",
            },
            {
              question: "What causes diabetes?",
              answer:
                "Causes vary by type, but include genetics, autoimmune issues, and lifestyle factors.",
            },
            {
              question:
                "What is the difference between Type 1 and Type 2 diabetes?",
              answer:
                "Type 1 is an autoimmune condition where the body attacks insulin-producing cells. Type 2 is often linked to lifestyle and develops over time.",
            },
            {
              question: "How is diabetes diagnosed?",
              answer:
                "Diabetes is diagnosed through blood tests such as fasting glucose, A1C, or oral glucose tolerance tests.",
            },
            {
              question: "Can diabetes be prevented?",
              answer:
                "Type 2 diabetes can often be prevented with healthy eating, exercise, and weight control.",
            },
            {
              question: "What are the complications of diabetes?",
              answer:
                "Complications include nerve damage, kidney disease, eye problems, and heart disease.",
            },
            {
              question: "How is diabetes managed?",
              answer:
                "It is managed with medications, insulin, healthy diet, exercise, and blood sugar monitoring.",
            },
          ],
        },
        {
          id: "2",
          disease: "Hypertension",
          qa: [
            {
              question: "What is hypertension?",
              answer:
                "Hypertension is high blood pressure, a condition that can lead to heart disease and stroke.",
            },
            {
              question: "What are the symptoms of hypertension?",
              answer:
                'Hypertension often has no symptoms, which is why it’s called the "silent killer."',
            },
            {
              question: "What causes hypertension?",
              answer:
                "Causes include genetics, poor diet, obesity, stress, and lack of physical activity.",
            },
            {
              question: "How is blood pressure measured?",
              answer:
                "It’s measured using a sphygmomanometer and recorded as systolic over diastolic pressure.",
            },
            {
              question: "What is considered normal blood pressure?",
              answer: "Normal blood pressure is typically around 120/80 mmHg.",
            },
            {
              question: "How can hypertension be prevented?",
              answer:
                "Prevention includes reducing salt intake, exercising regularly, and managing stress.",
            },
            {
              question: "Can hypertension be cured?",
              answer:
                "It can’t be cured, but it can be effectively managed through lifestyle and medication.",
            },
            {
              question: "What are complications of uncontrolled hypertension?",
              answer:
                "Complications include heart attack, stroke, kidney damage, and vision loss.",
            },
          ],
        },
        {
          id: "3",
          disease: "Coronary Heart Disease",
          qa: [
            {
              question: "What is coronary heart disease?",
              answer:
                "It is a condition where the coronary arteries become narrowed or blocked.",
            },
            {
              question: "What causes coronary heart disease?",
              answer:
                "It is mainly caused by plaque buildup in arteries (atherosclerosis).",
            },
            {
              question: "What are the symptoms of coronary heart disease?",
              answer:
                "Symptoms include chest pain (angina), shortness of breath, and heart attack.",
            },
            {
              question: "How is coronary heart disease diagnosed?",
              answer:
                "Diagnosis involves ECG, stress testing, echocardiogram, and angiography.",
            },
            {
              question: "What are risk factors for coronary heart disease?",
              answer:
                "Risk factors include smoking, high cholesterol, high blood pressure, and diabetes.",
            },
            {
              question: "How is coronary heart disease treated?",
              answer:
                "Treatment includes medications, lifestyle changes, and procedures like angioplasty.",
            },
            {
              question: "Can coronary heart disease be prevented?",
              answer:
                "Yes, by adopting a healthy lifestyle, exercising, and avoiding smoking.",
            },
            {
              question:
                "What lifestyle changes help with coronary heart disease?",
              answer:
                "Eating a heart-healthy diet, regular exercise, quitting smoking, and managing stress.",
            },
          ],
        },
        {
          id: "4",
          disease: "Stroke",
          qa: [
            {
              question: "What is a stroke?",
              answer:
                "A stroke occurs when blood flow to part of the brain is interrupted.",
            },
            {
              question: "What are the main types of stroke?",
              answer:
                "Ischemic (blocked artery) and hemorrhagic (bleeding in brain) strokes are the main types.",
            },
            {
              question: "What causes a stroke?",
              answer:
                "Causes include blood clots, ruptured blood vessels, or blocked arteries.",
            },
            {
              question: "What are the warning signs of a stroke?",
              answer:
                "Sudden numbness, confusion, trouble speaking, or loss of coordination.",
            },
            {
              question: "What should you do if someone is having a stroke?",
              answer:
                "Call emergency services immediately — every minute counts.",
            },
            {
              question: "How is stroke diagnosed?",
              answer:
                "Diagnosis is done using CT scans, MRIs, and neurological exams.",
            },
            {
              question: "Can strokes be prevented?",
              answer:
                "Yes, by managing blood pressure, diabetes, cholesterol, and avoiding smoking.",
            },
            {
              question: "What are possible long-term effects of a stroke?",
              answer:
                "Effects may include paralysis, speech problems, memory loss, or emotional changes.",
            },
          ],
        },
      ],
    },
    {
      langCode: "2", // Hindi
      diseases: [
        {
          id: "1",
          disease: "मधुमेह",
          qa: [
            {
              question: "मधुमेह क्या है?",
              answer:
                "मधुमेह एक पुरानी स्थिति है जो आपके शरीर के खाने को ऊर्जा में बदलने के तरीके को प्रभावित करती है।",
            },
            {
              question: "मधुमेह के लक्षण क्या हैं?",
              answer:
                "सामान्य लक्षणों में अत्यधिक प्यास, बार-बार पेशाब आना, अत्यधिक थकान और धुंधला दृष्टि शामिल हैं।",
            },
            {
              question: "मधुमेह का कारण क्या है?",
              answer:
                "कारण प्रकार के अनुसार भिन्न होते हैं, लेकिन इनमें आनुवंशिकी, स्वप्रतिरक्षित समस्याएँ, और जीवनशैली के कारक शामिल हैं।",
            },
            {
              question: "टाइप 1 और टाइप 2 मधुमेह में क्या अंतर है?",
              answer:
                "टाइप 1 एक स्वप्रतिरक्षित स्थिति है जिसमें शरीर इंसुलिन उत्पादन करने वाली कोशिकाओं पर हमला करता है। टाइप 2 आमतौर पर जीवनशैली से जुड़ा होता है और समय के साथ विकसित होता है।",
            },
            {
              question: "मधुमेह का निदान कैसे किया जाता है?",
              answer:
                "मधुमेह का निदान रक्त परीक्षणों के माध्यम से किया जाता है, जैसे कि फास्टिंग ग्लूकोज, A1C, या ओरल ग्लूकोज टॉलरेंस टेस्ट।",
            },
            {
              question: "क्या मधुमेह को रोका जा सकता है?",
              answer:
                "टाइप 2 मधुमेह को अक्सर स्वस्थ आहार, व्यायाम, और वजन नियंत्रण के माध्यम से रोका जा सकता है।",
            },
            {
              question: "मधुमेह के क्या जटिलताएँ हो सकती हैं?",
              answer:
                "जटिलताओं में तंत्रिका क्षति, गुर्दे की बीमारी, आंखों की समस्याएँ, और हृदय रोग शामिल हैं।",
            },
            {
              question: "मधुमेह का प्रबंधन कैसे किया जाता है?",
              answer:
                "इसे दवाओं, इंसुलिन, स्वस्थ आहार, व्यायाम, और रक्त शर्करा की निगरानी के साथ प्रबंधित किया जाता है।",
            },
          ],
        },
        {
          id: "2",
          disease: "उच्च रक्तचाप",
          qa: [
            {
              question: "हाई ब्लड प्रेशर क्या है?",
              answer:
                "हाइपरटेंशन उच्च रक्तचाप है, एक स्थिति जो हृदय रोग और स्ट्रोक का कारण बन सकती है।",
            },
            {
              question: "हाइपरटेंशन के लक्षण क्या हैं?",
              answer:
                'हाइपरटेंशन में अक्सर कोई लक्षण नहीं होते हैं, यही कारण है कि इसे "साइलेंट किलर" कहा जाता है।',
            },
            {
              question: "हाइपरटेंशन का कारण क्या है?",
              answer:
                "कारणों में आनुवंशिकी, खराब आहार, मोटापा, तनाव और शारीरिक गतिविधि की कमी शामिल हैं।",
            },
            {
              question: "रक्तचाप कैसे मापा जाता है?",
              answer:
                "इसे एक स्फिग्मोमैनोमीटर का उपयोग करके मापा जाता है और सिस्टोलिक और डायस्टोलिक दबाव के रूप में रिकॉर्ड किया जाता है।",
            },
            {
              question: "सामान्य रक्तचाप क्या माना जाता है?",
              answer:
                "सामान्य रक्तचाप आमतौर पर 120/80 मिमीएचजी के आसपास होता है।",
            },
            {
              question: "हाइपरटेंशन को कैसे रोका जा सकता है?",
              answer:
                "रोकथाम में नमक का सेवन कम करना, नियमित रूप से व्यायाम करना, और तनाव का प्रबंधन करना शामिल है।",
            },
            {
              question: "क्या हाइपरटेंशन का इलाज किया जा सकता है?",
              answer:
                "इसका इलाज नहीं किया जा सकता है, लेकिन इसे जीवनशैली और दवाओं के माध्यम से प्रभावी रूप से प्रबंधित किया जा सकता है।",
            },
            {
              question: "अनियंत्रित हाइपरटेंशन की जटिलताएँ क्या हैं?",
              answer:
                "जटिलताओं में दिल का दौरा, स्ट्रोक, किडनी की क्षति, और दृष्टि हानि शामिल हैं।",
            },
          ],
        },
        {
          id: "3",
          disease: "कोरोनरी हृदय रोग",
          qa: [
            {
              question: "कोरोनरी हृदय रोग क्या है?",
              answer:
                "यह एक स्थिति है जिसमें कोरोनरी धमनियाँ संकुचित या अवरुद्ध हो जाती हैं।",
            },
            {
              question: "कोरोनरी हृदय रोग का कारण क्या है?",
              answer:
                "यह मुख्य रूप से धमनियों में पट्टिका निर्माण (एथेरोस्क्लेरोसिस) के कारण होता है।",
            },
            {
              question: "कोरोनरी हृदय रोग के लक्षण क्या हैं?",
              answer:
                "लक्षणों में छाती में दर्द (एंजाइना), सांस फूलना, और दिल का दौरा शामिल हैं।",
            },
            {
              question: "कोरोनरी हृदय रोग का निदान कैसे किया जाता है?",
              answer:
                "निदान में ईसीजी, तनाव परीक्षण, इकोकार्डियोग्राम और एंजियोग्राफी शामिल हैं।",
            },
            {
              question: "कोरोनरी हृदय रोग के जोखिम कारक क्या हैं?",
              answer:
                "जोखिम कारकों में धूम्रपान, उच्च कोलेस्ट्रॉल, उच्च रक्तचाप, और मधुमेह शामिल हैं।",
            },
            {
              question: "कोरोनरी हृदय रोग का इलाज कैसे किया जाता है?",
              answer:
                "इलाज में दवाएँ, जीवनशैली में बदलाव, और एंजियोप्लास्टी जैसे प्रक्रियाएँ शामिल हैं।",
            },
            {
              question: "क्या कोरोनरी हृदय रोग को रोका जा सकता है?",
              answer:
                "हाँ, एक स्वस्थ जीवनशैली अपनाकर, व्यायाम करके और धूम्रपान से बचकर इसे रोका जा सकता है।",
            },
            {
              question:
                "कोरोनरी हृदय रोग के लिए कौन से जीवनशैली परिवर्तन मददगार हैं?",
              answer:
                "एक हृदय-स्वस्थ आहार, नियमित व्यायाम, धूम्रपान छोड़ना और तनाव का प्रबंधन।",
            },
          ],
        },
        {
          id: "4",
          disease: "लकवा",
          qa: [
            {
              question: "स्ट्रोक क्या है?",
              answer:
                "स्ट्रोक तब होता है जब मस्तिष्क के किसी हिस्से में रक्त प्रवाह बाधित हो जाता है।",
            },
            {
              question: "स्ट्रोक के मुख्य प्रकार क्या हैं?",
              answer:
                "इस्केमिक (अवरोधित धमनी) और हेमरेजिक (मस्तिष्क में रक्तस्राव) स्ट्रोक मुख्य प्रकार हैं।",
            },
            {
              question: "स्ट्रोक का कारण क्या है?",
              answer:
                "कारणों में रक्त के थक्के, रक्त वाहिकाओं का फटना, या धमनी अवरोध शामिल हैं।",
            },
            {
              question: "स्ट्रोक के चेतावनी संकेत क्या हैं?",
              answer:
                "अचानक सुन्न होना, भ्रम, बोलने में परेशानी, या समन्वय की हानि।",
            },
            {
              question:
                "यदि कोई व्यक्ति स्ट्रोक का सामना कर रहा हो तो क्या करना चाहिए?",
              answer:
                "तत्काल आपातकालीन सेवाओं को कॉल करें — हर मिनट महत्वपूर्ण है।",
            },
            {
              question: "स्ट्रोक का निदान कैसे किया जाता है?",
              answer:
                "निदान में सीटी स्कैन, एमआरआई, और न्यूरोलॉजिकल परीक्षण शामिल हैं।",
            },
            {
              question: "क्या स्ट्रोक को रोका जा सकता है?",
              answer:
                "हाँ, रक्तचाप, मधुमेह, कोलेस्ट्रॉल का प्रबंधन करके और धूम्रपान से बचकर इसे रोका जा सकता है।",
            },
            {
              question: "स्ट्रोक के बाद के संभावित दीर्घकालिक प्रभाव क्या हैं?",
              answer:
                "प्रभावों में पक्षाघात, बोलने की समस्याएँ, याददाश्त हानि, या भावनात्मक बदलाव हो सकते हैं।",
            },
          ],
        },
      ],
    },
    {
      langCode: "3", // Tamil
      diseases: [
        {
          id: "1",
          disease: "நீரிழிவு",
          qa: [
            {
              question: "நீரிழிவு என்றால் என்ன?",
              answer:
                "நீரிழிவு என்பது உங்கள் உடல் உணவை ஆற்றலாக மாற்றும் முறையை பாதிக்கும் நீண்டகால நிலைமையாகும்.",
            },
            {
              question: "நீரிழிவின் அறிகுறிகள் என்ன?",
              answer:
                "வலியுறுத்தப்படும் அறிகுறிகள்: அதிக தாகம், அடிக்கடி சிறுநீர்விடுதல், அதீத சோர்வு மற்றும் மங்கலான பார்வை.",
            },
            {
              question: "நீரிழிவுக்கு காரணம் என்ன?",
              answer:
                "வகைப்பட்டு மாறுபடும் காரணங்கள் – மரபியல், தன்னிச்சையான உடல் தாக்கம், மற்றும் வாழ்க்கைமுறை தொடர்பான காரணங்கள் அடங்கும்.",
            },
            {
              question:
                "Type 1 மற்றும் Type 2 நீரிழிவுக்கு இடையிலான வேறுபாடு என்ன?",
              answer:
                "Type 1 என்பது உடல் இன்சுலின் உருவாக்கும் செல்களை தாக்கும் தன்னிச்சையான நிலை. Type 2 வாழ்க்கைமுறை காரணமாக மெதுவாக உருவாகும்.",
            },
            {
              question: "நீரிழிவு எவ்வாறு கண்டறியப்படுகிறது?",
              answer:
                "உண்ணாத நிலையில் இரத்த சர்க்கரை சோதனை, A1C, அல்லது வாய்வழி குளுக்கோஸ் சகிப்புத் தேர்வு மூலம் கண்டறிகிறது.",
            },
            {
              question: "நீரிழிவைத் தடுக்க முடியுமா?",
              answer:
                "Type 2 நீரிழிவை ஆரோக்கியமான உணவு, உடற்பயிற்சி மற்றும் உடல் எடை கட்டுப்பாடு மூலம் பெரும்பாலும் தடுக்கலாம்.",
            },
            {
              question: "நீரிழிவின் சிக்கல்கள் என்னென்ன?",
              answer:
                "நரம்புகள் சேதம், சிறுநீரக நோய், கண் பிரச்சனைகள் மற்றும் இதய நோய்கள் அடங்கும்.",
            },
            {
              question: "நீரிழிவை எவ்வாறு நிர்வகிக்கலாம்?",
              answer:
                "மருந்துகள், இன்சுலின், ஆரோக்கிய உணவு, உடற்பயிற்சி மற்றும் இரத்த சர்க்கரை கண்காணிப்பு மூலம் நிர்வகிக்கப்படுகிறது.",
            },
          ],
        },
        {
          id: "2",
          disease: "அதிக இரத்த அழுத்தம்",
          qa: [
            {
              question: "அதிக இரத்த அழுத்தம் என்றால் என்ன?",
              answer:
                "இதய நோய் மற்றும் பக்கவாதத்திற்கு வழிவகுக்கும் நிலையான உயர் இரத்த அழுத்தம்.",
            },
            {
              question: "அதிக இரத்த அழுத்தத்தின் அறிகுறிகள் என்ன?",
              answer:
                "அதிக அழுத்தம் பெரும்பாலும் அறிகுறிகள் இல்லாதது — அதனால் இது 'அமைதியான கொலைக்காரன்' என அழைக்கப்படுகிறது.",
            },
            {
              question: "அதிக இரத்த அழுத்தத்திற்கு காரணம் என்ன?",
              answer:
                "மரபியல், மோசமான உணவு பழக்கம், குடல் பெரிதாகும், மன அழுத்தம் மற்றும் உடற்பயிற்சி இல்லாமை ஆகியவை காரணம்.",
            },
            {
              question: "இரத்த அழுத்தம் எவ்வாறு அளக்கப்படுகிறது?",
              answer:
                "இது ஸ்பிக்மோமனோமீட்டர் என்ற கருவி மூலம் அளக்கப்படுகிறது மற்றும் உயர்/தாழ் அழுத்தம் என பதிவு செய்யப்படுகிறது.",
            },
            {
              question: "சாதாரண இரத்த அழுத்தம் எவ்வளவு?",
              answer: "சாதாரணமாக 120/80 mmHg ஆக இருக்க வேண்டும்.",
            },
            {
              question: "அதிக இரத்த அழுத்தத்தைத் தடுக்க என்ன செய்யலாம்?",
              answer:
                "உப்பு உணவுகளை குறைத்தல், தவறாமல் உடற்பயிற்சி செய்தல் மற்றும் மன அழுத்தத்தை கட்டுப்படுத்துதல்.",
            },
            {
              question: "அதிக இரத்த அழுத்தம் குணமாகுமா?",
              answer:
                "இது முழுமையாக குணமாகாது; ஆனால் வாழ்க்கைமுறை மற்றும் மருந்துகளால் நிர்வகிக்க முடியும்.",
            },
            {
              question:
                "கட்டுப்பாடின்றி அதிக இரத்த அழுத்தம் இருந்தால் ஏற்படும் சிக்கல்கள் என்ன?",
              answer:
                "இதய நோய், பக்கவாதம், சிறுநீரக சேதம் மற்றும் பார்வை இழப்பை ஏற்படுத்தும்.",
            },
          ],
        },
        {
          id: "3",
          disease: "இதய நாள அழற்சி நோய்",
          qa: [
            {
              question: "இதய நாள அழற்சி நோய் என்றால் என்ன?",
              answer:
                "இதயத்திற்கு இரத்தம் செல்லும் நாளங்களில் குறுக்கல் அல்லது தடுப்பு ஏற்படும் நிலை.",
            },
            {
              question: "இதய நாள அழற்சி நோய்க்கு காரணம் என்ன?",
              answer:
                "இதன் முக்கிய காரணம் – நாள்களில் அடர்ந்த கொழுப்பு பிளேக் தேக்கம் (அதெரோஸ்க்லெரோசிஸ்).",
            },
            {
              question: "இதய நாள அழற்சி நோயின் அறிகுறிகள் என்ன?",
              answer:
                "மார்புப்ப締ுத்தம் (அஞ்ஜினா), மூச்சுத்திணறல் மற்றும் இதயக் குத்து போன்றவை.",
            },
            {
              question: "இதய நாள அழற்சி நோய் எவ்வாறு கண்டறியப்படுகிறது?",
              answer:
                "ECG, ஸ்டிரெஸ் டெஸ்ட், எக்கோகார்டியோகிராம் மற்றும் ஆஞ்சியோகிராபி மூலம்.",
            },
            {
              question: "இதய நாள அழற்சி நோய்க்கான ஆபத்து காரணிகள் என்ன?",
              answer:
                "புகைபிடித்தல், அதிக கொழுப்பு, உயர் அழுத்தம் மற்றும் நீரிழிவு நோய்.",
            },
            {
              question: "இதய நாள அழற்சி நோயை எவ்வாறு சிகிச்சை செய்கின்றனர்?",
              answer:
                "மருந்துகள், வாழ்க்கைமுறை மாற்றங்கள் மற்றும் ஆஞ்சியோபிளாஸ்டி போன்ற சிகிச்சைகள் மூலம்.",
            },
            {
              question: "இதய நாள அழற்சி நோயைத் தடுக்க முடியுமா?",
              answer:
                "ஆமாம், ஆரோக்கியமான வாழ்க்கைமுறை, உடற்பயிற்சி மற்றும் புகைபிடிப்பதை தவிர்ப்பதன் மூலம்.",
            },
            {
              question: "இதய நோயுக்கு ஏற்ற வாழ்க்கைமுறை மாற்றங்கள் என்ன?",
              answer:
                "இதயத்துக்கு உகந்த உணவு, உடற்பயிற்சி, புகைபிடிப்பதை நிறுத்தல் மற்றும் மன அழுத்தத்தை குறைத்தல்.",
            },
          ],
        },
        {
          id: "4",
          disease: "பக்கவாதம்",
          qa: [
            {
              question: "பக்கவாதம் என்றால் என்ன?",
              answer:
                "மூளைக்கு செல்லும் இரத்த ஓட்டம் தடைபடும்போது பக்கவாதம் ஏற்படுகிறது.",
            },
            {
              question: "பக்கவாதத்தின் முக்கிய வகைகள் என்ன?",
              answer:
                "இஸ்கிமிக் (நாள்தடை) மற்றும் ஹெமராஜிக் (மூளையில் இரத்தம் கசியும்) பக்கவாதங்கள்.",
            },
            {
              question: "பக்கவாதத்திற்கு காரணங்கள் என்ன?",
              answer: "இரத்த உறைகள், கிழிந்த நாளங்கள் அல்லது தடைபட்ட நாள்கள்.",
            },
            {
              question: "பக்கவாதத்தின் எச்சரிக்கை அறிகுறிகள் என்ன?",
              answer:
                "திடீர் கை/கால் உணர்விழப்பு, குழப்பம், பேச்சு பிரச்சனை, சமநிலை இழப்பு.",
            },
            {
              question: "யாராவது பக்கவாதம் அடைந்தால் என்ன செய்ய வேண்டும்?",
              answer:
                "உடனடியாக அவசர சேவைகளை அழைக்க வேண்டும் — ஒவ்வொரு நிமிடமும் முக்கியம்.",
            },
            {
              question: "பக்கவாதம் எவ்வாறு கண்டறியப்படுகிறது?",
              answer: "CT ஸ்கேன், MRI மற்றும் நரம்பியல் பரிசோதனைகள் மூலம்.",
            },
            {
              question: "பக்கவாதத்தைத் தடுக்க முடியுமா?",
              answer:
                "ஆமாம், இரத்த அழுத்தம், நீரிழிவு, கொழுப்பு கட்டுப்பாடு மற்றும் புகைபிடித்தலை தவிர்த்து.",
            },
            {
              question: "பக்கவாதத்தின் நீண்டகால விளைவுகள் என்ன?",
              answer:
                "உடல் இயக்கம் இழப்பு, பேச்சு பிரச்சனைகள், நினைவிழப்பு மற்றும் உணர்ச்சி மாற்றங்கள்.",
            },
          ],
        },
      ],
    },
  ];

  // Filter the correct disease's QA data
  const langCode = localStorage.getItem("refLanCode") || "1"; // Default to 1 (English) if no langCode is found in localStorage

  const qaList = qaData
    .filter((item) => item.langCode === langCode)[0]
    .diseases.find((disease) => disease.id === sentDisease);

  return (
    <IonPage className="cus-ion-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <h4 style={{ margin: "0" }}>{qaList?.disease}</h4>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonAccordionGroup>
          {qaList?.qa.map((qa, index) => (
            <IonAccordion
              key={index}
              value={`item-${index}`}
              style={{ marginBottom: "10px" }}
            >
              <IonItem slot="header">
                <IonLabel style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {qa.question}
                </IonLabel>
              </IonItem>
              <div
                className="ion-padding"
                slot="content"
                style={{ fontSize: "14px", lineHeight: "1.5" }}
              >
                {qa.answer}
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default KnowAbout;
