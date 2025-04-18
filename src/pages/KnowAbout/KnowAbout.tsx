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
      disease: 'diabetes',
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
        },
      ],
    },
    {
      disease: 'hypertension',
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
        },
      ],
    },
    {
      disease: 'coronary heart disease',
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
        },
      ],
    },
    {
      disease: 'stroke',
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
        },
      ],
    },
  ];

  // Filter the correct disease's QA data
  const qaList = qaData.find((item) => item.disease === sentDisease)?.qa || [];

  return (
    <IonPage className='cus-ion-page'>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/home" icon={chevronBack} />
          </IonButtons>
          <h4 style={{margin: "0"}}>{sentDisease.charAt(0).toUpperCase() + sentDisease.slice(1)}</h4>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonAccordionGroup>
          {qaList.map((qa, index) => (
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
