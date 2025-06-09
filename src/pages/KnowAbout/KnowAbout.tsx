import React from 'react';
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
} from '@ionic/react';
import { useParams } from 'react-router';
import { chevronBack } from 'ionicons/icons';

const KnowAbout: React.FC = () => {
  const { sentDisease } = useParams<{ sentDisease: string }>();

  // Your QA data
  const qaData = [
    {
      langCode: "1", // English
      diseases: [
        {
          id: "1",
          disease: 'Diabetes',
          qa: [
            {
              question: 'What is diabetes?',
              answer: 'Diabetes is a chronic condition that affects how your body turns food into energy.',
            },
            {
              question: 'What are the symptoms of diabetes?',
              answer: 'Common symptoms include increased thirst, frequent urination, extreme fatigue, and blurry vision.',
            },
            {
              question: 'What causes diabetes?',
              answer: 'Causes vary by type, but include genetics, autoimmune issues, and lifestyle factors.',
            },
            {
              question: 'What is the difference between Type 1 and Type 2 diabetes?',
              answer: 'Type 1 is an autoimmune condition where the body attacks insulin-producing cells. Type 2 is often linked to lifestyle and develops over time.',
            },
            {
              question: 'How is diabetes diagnosed?',
              answer: 'Diabetes is diagnosed through blood tests such as fasting glucose, A1C, or oral glucose tolerance tests.',
            },
            {
              question: 'Can diabetes be prevented?',
              answer: 'Type 2 diabetes can often be prevented with healthy eating, exercise, and weight control.',
            },
            {
              question: 'What are the complications of diabetes?',
              answer: 'Complications include nerve damage, kidney disease, eye problems, and heart disease.',
            },
            {
              question: 'How is diabetes managed?',
              answer: 'It is managed with medications, insulin, healthy diet, exercise, and blood sugar monitoring.',
            }
          ]
        },
        {
          id: "2",
          disease: 'Hypertension',
          qa: [
            {
              question: 'What is hypertension?',
              answer: 'Hypertension is high blood pressure, a condition that can lead to heart disease and stroke.',
            },
            {
              question: 'What are the symptoms of hypertension?',
              answer: 'Hypertension often has no symptoms, which is why it’s called the "silent killer."',
            },
            {
              question: 'What causes hypertension?',
              answer: 'Causes include genetics, poor diet, obesity, stress, and lack of physical activity.',
            },
            {
              question: 'How is blood pressure measured?',
              answer: 'It’s measured using a sphygmomanometer and recorded as systolic over diastolic pressure.',
            },
            {
              question: 'What is considered normal blood pressure?',
              answer: 'Normal blood pressure is typically around 120/80 mmHg.',
            },
            {
              question: 'How can hypertension be prevented?',
              answer: 'Prevention includes reducing salt intake, exercising regularly, and managing stress.',
            },
            {
              question: 'Can hypertension be cured?',
              answer: 'It can’t be cured, but it can be effectively managed through lifestyle and medication.',
            },
            {
              question: 'What are complications of uncontrolled hypertension?',
              answer: 'Complications include heart attack, stroke, kidney damage, and vision loss.',
            }
          ]
        },
        {
          id: "3",
          disease: 'Coronary Heart Disease',
          qa: [
            {
              question: 'What is coronary heart disease?',
              answer: 'It is a condition where the coronary arteries become narrowed or blocked.',
            },
            {
              question: 'What causes coronary heart disease?',
              answer: 'It is mainly caused by plaque buildup in arteries (atherosclerosis).',
            },
            {
              question: 'What are the symptoms of coronary heart disease?',
              answer: 'Symptoms include chest pain (angina), shortness of breath, and heart attack.',
            },
            {
              question: 'How is coronary heart disease diagnosed?',
              answer: 'Diagnosis involves ECG, stress testing, echocardiogram, and angiography.',
            },
            {
              question: 'What are risk factors for coronary heart disease?',
              answer: 'Risk factors include smoking, high cholesterol, high blood pressure, and diabetes.',
            },
            {
              question: 'How is coronary heart disease treated?',
              answer: 'Treatment includes medications, lifestyle changes, and procedures like angioplasty.',
            },
            {
              question: 'Can coronary heart disease be prevented?',
              answer: 'Yes, by adopting a healthy lifestyle, exercising, and avoiding smoking.',
            },
            {
              question: 'What lifestyle changes help with coronary heart disease?',
              answer: 'Eating a heart-healthy diet, regular exercise, quitting smoking, and managing stress.',
            }
          ]
        },
        {
          id: "4",
          disease: 'Stroke',
          qa: [
            {
              question: 'What is a stroke?',
              answer: 'A stroke occurs when blood flow to part of the brain is interrupted.',
            },
            {
              question: 'What are the main types of stroke?',
              answer: 'Ischemic (blocked artery) and hemorrhagic (bleeding in brain) strokes are the main types.',
            },
            {
              question: 'What causes a stroke?',
              answer: 'Causes include blood clots, ruptured blood vessels, or blocked arteries.',
            },
            {
              question: 'What are the warning signs of a stroke?',
              answer: 'Sudden numbness, confusion, trouble speaking, or loss of coordination.',
            },
            {
              question: 'What should you do if someone is having a stroke?',
              answer: 'Call emergency services immediately — every minute counts.',
            },
            {
              question: 'How is stroke diagnosed?',
              answer: 'Diagnosis is done using CT scans, MRIs, and neurological exams.',
            },
            {
              question: 'Can strokes be prevented?',
              answer: 'Yes, by managing blood pressure, diabetes, cholesterol, and avoiding smoking.',
            },
            {
              question: 'What are possible long-term effects of a stroke?',
              answer: 'Effects may include paralysis, speech problems, memory loss, or emotional changes.',
            }
          ]
        }
      ]
    },
    {
      langCode: "2", // Hindi
      diseases: [
        {
          id: "1",
          disease: 'मधुमेह',
          qa: [
            {
              question: 'मधुमेह क्या है?',
              answer: 'मधुमेह एक पुरानी स्थिति है जो आपके शरीर के खाने को ऊर्जा में बदलने के तरीके को प्रभावित करती है।',
            },
            {
              question: 'मधुमेह के लक्षण क्या हैं?',
              answer: 'सामान्य लक्षणों में अत्यधिक प्यास, बार-बार पेशाब आना, अत्यधिक थकान और धुंधला दृष्टि शामिल हैं।',
            },
            {
              question: 'मधुमेह का कारण क्या है?',
              answer: 'कारण प्रकार के अनुसार भिन्न होते हैं, लेकिन इनमें आनुवंशिकी, स्वप्रतिरक्षित समस्याएँ, और जीवनशैली के कारक शामिल हैं।',
            },
            {
              question: 'टाइप 1 और टाइप 2 मधुमेह में क्या अंतर है?',
              answer: 'टाइप 1 एक स्वप्रतिरक्षित स्थिति है जिसमें शरीर इंसुलिन उत्पादन करने वाली कोशिकाओं पर हमला करता है। टाइप 2 आमतौर पर जीवनशैली से जुड़ा होता है और समय के साथ विकसित होता है।',
            },
            {
              question: 'मधुमेह का निदान कैसे किया जाता है?',
              answer: 'मधुमेह का निदान रक्त परीक्षणों के माध्यम से किया जाता है, जैसे कि फास्टिंग ग्लूकोज, A1C, या ओरल ग्लूकोज टॉलरेंस टेस्ट।',
            },
            {
              question: 'क्या मधुमेह को रोका जा सकता है?',
              answer: 'टाइप 2 मधुमेह को अक्सर स्वस्थ आहार, व्यायाम, और वजन नियंत्रण के माध्यम से रोका जा सकता है।',
            },
            {
              question: 'मधुमेह के क्या जटिलताएँ हो सकती हैं?',
              answer: 'जटिलताओं में तंत्रिका क्षति, गुर्दे की बीमारी, आंखों की समस्याएँ, और हृदय रोग शामिल हैं।',
            },
            {
              question: 'मधुमेह का प्रबंधन कैसे किया जाता है?',
              answer: 'इसे दवाओं, इंसुलिन, स्वस्थ आहार, व्यायाम, और रक्त शर्करा की निगरानी के साथ प्रबंधित किया जाता है।',
            }
          ]
        },
        {
          id: "2",
          disease: 'उच्च रक्तचाप',
          qa: [
            {
              question: 'हाई ब्लड प्रेशर क्या है?',
              answer: 'हाइपरटेंशन उच्च रक्तचाप है, एक स्थिति जो हृदय रोग और स्ट्रोक का कारण बन सकती है।',
            },
            {
              question: 'हाइपरटेंशन के लक्षण क्या हैं?',
              answer: 'हाइपरटेंशन में अक्सर कोई लक्षण नहीं होते हैं, यही कारण है कि इसे "साइलेंट किलर" कहा जाता है।',
            },
            {
              question: 'हाइपरटेंशन का कारण क्या है?',
              answer: 'कारणों में आनुवंशिकी, खराब आहार, मोटापा, तनाव और शारीरिक गतिविधि की कमी शामिल हैं।',
            },
            {
              question: 'रक्तचाप कैसे मापा जाता है?',
              answer: 'इसे एक स्फिग्मोमैनोमीटर का उपयोग करके मापा जाता है और सिस्टोलिक और डायस्टोलिक दबाव के रूप में रिकॉर्ड किया जाता है।',
            },
            {
              question: 'सामान्य रक्तचाप क्या माना जाता है?',
              answer: 'सामान्य रक्तचाप आमतौर पर 120/80 मिमीएचजी के आसपास होता है।',
            },
            {
              question: 'हाइपरटेंशन को कैसे रोका जा सकता है?',
              answer: 'रोकथाम में नमक का सेवन कम करना, नियमित रूप से व्यायाम करना, और तनाव का प्रबंधन करना शामिल है।',
            },
            {
              question: 'क्या हाइपरटेंशन का इलाज किया जा सकता है?',
              answer: 'इसका इलाज नहीं किया जा सकता है, लेकिन इसे जीवनशैली और दवाओं के माध्यम से प्रभावी रूप से प्रबंधित किया जा सकता है।',
            },
            {
              question: 'अनियंत्रित हाइपरटेंशन की जटिलताएँ क्या हैं?',
              answer: 'जटिलताओं में दिल का दौरा, स्ट्रोक, किडनी की क्षति, और दृष्टि हानि शामिल हैं।',
            }
          ]
        },
        {
          id: "3",
          disease: 'कोरोनरी हृदय रोग',
          qa: [
            {
              question: 'कोरोनरी हृदय रोग क्या है?',
              answer: 'यह एक स्थिति है जिसमें कोरोनरी धमनियाँ संकुचित या अवरुद्ध हो जाती हैं।',
            },
            {
              question: 'कोरोनरी हृदय रोग का कारण क्या है?',
              answer: 'यह मुख्य रूप से धमनियों में पट्टिका निर्माण (एथेरोस्क्लेरोसिस) के कारण होता है।',
            },
            {
              question: 'कोरोनरी हृदय रोग के लक्षण क्या हैं?',
              answer: 'लक्षणों में छाती में दर्द (एंजाइना), सांस फूलना, और दिल का दौरा शामिल हैं।',
            },
            {
              question: 'कोरोनरी हृदय रोग का निदान कैसे किया जाता है?',
              answer: 'निदान में ईसीजी, तनाव परीक्षण, इकोकार्डियोग्राम और एंजियोग्राफी शामिल हैं।',
            },
            {
              question: 'कोरोनरी हृदय रोग के जोखिम कारक क्या हैं?',
              answer: 'जोखिम कारकों में धूम्रपान, उच्च कोलेस्ट्रॉल, उच्च रक्तचाप, और मधुमेह शामिल हैं।',
            },
            {
              question: 'कोरोनरी हृदय रोग का इलाज कैसे किया जाता है?',
              answer: 'इलाज में दवाएँ, जीवनशैली में बदलाव, और एंजियोप्लास्टी जैसे प्रक्रियाएँ शामिल हैं।',
            },
            {
              question: 'क्या कोरोनरी हृदय रोग को रोका जा सकता है?',
              answer: 'हाँ, एक स्वस्थ जीवनशैली अपनाकर, व्यायाम करके और धूम्रपान से बचकर इसे रोका जा सकता है।',
            },
            {
              question: 'कोरोनरी हृदय रोग के लिए कौन से जीवनशैली परिवर्तन मददगार हैं?',
              answer: 'एक हृदय-स्वस्थ आहार, नियमित व्यायाम, धूम्रपान छोड़ना और तनाव का प्रबंधन।',
            }
          ]
        },
        {
          id: "4",
          disease: 'लकवा',
          qa: [
            {
              question: 'स्ट्रोक क्या है?',
              answer: 'स्ट्रोक तब होता है जब मस्तिष्क के किसी हिस्से में रक्त प्रवाह बाधित हो जाता है।',
            },
            {
              question: 'स्ट्रोक के मुख्य प्रकार क्या हैं?',
              answer: 'इस्केमिक (अवरोधित धमनी) और हेमरेजिक (मस्तिष्क में रक्तस्राव) स्ट्रोक मुख्य प्रकार हैं।',
            },
            {
              question: 'स्ट्रोक का कारण क्या है?',
              answer: 'कारणों में रक्त के थक्के, रक्त वाहिकाओं का फटना, या धमनी अवरोध शामिल हैं।',
            },
            {
              question: 'स्ट्रोक के चेतावनी संकेत क्या हैं?',
              answer: 'अचानक सुन्न होना, भ्रम, बोलने में परेशानी, या समन्वय की हानि।',
            },
            {
              question: 'यदि कोई व्यक्ति स्ट्रोक का सामना कर रहा हो तो क्या करना चाहिए?',
              answer: 'तत्काल आपातकालीन सेवाओं को कॉल करें — हर मिनट महत्वपूर्ण है।',
            },
            {
              question: 'स्ट्रोक का निदान कैसे किया जाता है?',
              answer: 'निदान में सीटी स्कैन, एमआरआई, और न्यूरोलॉजिकल परीक्षण शामिल हैं।',
            },
            {
              question: 'क्या स्ट्रोक को रोका जा सकता है?',
              answer: 'हाँ, रक्तचाप, मधुमेह, कोलेस्ट्रॉल का प्रबंधन करके और धूम्रपान से बचकर इसे रोका जा सकता है।',
            },
            {
              question: 'स्ट्रोक के बाद के संभावित दीर्घकालिक प्रभाव क्या हैं?',
              answer: 'प्रभावों में पक्षाघात, बोलने की समस्याएँ, याददाश्त हानि, या भावनात्मक बदलाव हो सकते हैं।',
            }
          ]
        }
      ]
    }
  ];
  

  // Filter the correct disease's QA data
  const langCode = localStorage.getItem('refLanCode') || "1"; // Default to 1 (English) if no langCode is found in localStorage


const qaList = qaData.filter(item => item.langCode === langCode)[0].diseases.find((disease) => disease.id === sentDisease);

  return (
    <IonPage className='cus-ion-page'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <h4 style={{margin: "0"}}>{qaList?.disease}</h4>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonAccordionGroup>
          {qaList?.qa.map((qa, index) => (
            <IonAccordion key={index} value={`item-${index}`} style={{ marginBottom: '10px' }}>
              <IonItem slot="header">
                <IonLabel style={{ fontWeight: 'bold', fontSize: '16px' }}>{qa.question}</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content" style={{ fontSize: '14px', lineHeight: '1.5' }}>
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
