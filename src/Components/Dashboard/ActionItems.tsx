import {
   Alert,
   Text,
 } from '@mantine/core';
 import { Carousel } from '@mantine/carousel';
 import Autoplay from 'embla-carousel-autoplay';
 import '@mantine/carousel/styles.css';
 import {
   IconAlertCircle,
   IconBulb,
   IconCalendarCheck,
   IconBriefcase,
   IconSchool,
 } from '@tabler/icons-react';
 import { useRef } from 'react';
 
 // Action item templates with variables
 const actionItemTemplates = [
   {
     title: 'Resume Update Required',
     message: "Your resume hasn't been updated in the last {days} days. Please review and update.",
     color: 'blue',
     icon: <IconAlertCircle />,
     variables: ['days'],
   },
   {
     title: 'Attendance Missing',
     message: 'You haven’t marked attendance for the last {days} days. Please confirm or update.',
     color: 'green',
     icon: <IconCalendarCheck />,
     variables: ['days'],
   },
   {
     title: 'Training Reminder',
     message: 'You have a pending training scheduled for {date} at {time}.',
     color: 'grape',
     icon: <IconSchool />,
     variables: ['date', 'time'],
   },
   {
     title: 'New Opportunities Available',
     message: '{count} new projects match your skills. Apply now to increase your chances.',
     color: 'yellow',
     icon: <IconBriefcase />,
     variables: ['count'],
   },
   {
     title: 'Recommended Learning',
     message: 'Try “{course}” to enhance your {skill} skills.',
     color: 'grape',
     icon: <IconBulb />,
     variables: ['course', 'skill'],
   },
 ];
 
 // Example known facts (in a real app, these would come from user data)
 const knownFacts = {
   days: 2,
   date: 'tomorrow',
   time: '10AM',
   count: 3,
   course: 'Mastering TypeScript',
   skill: 'JavaScript',
 };
 
// Generate action items by replacing variables in templates
type ActionItemTemplate = {
  title: string;
  message: string;
  color: string;
  icon: React.ReactNode;
  variables: string[];
};

type KnownFacts = Record<string, string | number>;

function generateActionItems(
  templates: ActionItemTemplate[],
  facts: KnownFacts
) {
  return templates.map((tpl) => {
    let msg = tpl.message;
    tpl.variables.forEach((v) => {
      msg = msg.replace(`{${v}}`, String(facts[v]));
    });
    return {
      title: tpl.title,
      message: msg,
      color: tpl.color,
      icon: tpl.icon,
    };
  });
}
 
 const actionItems = generateActionItems(actionItemTemplates, knownFacts);
 
 export default function ActionItemsCarousel() {
   const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
 
   return ( 
       <Carousel
         slideGap="md"
         slideSize="50%"
         plugins={[autoplay.current]}
         withControls={false}
         styles={{
           indicator: {
             backgroundColor: 'var(--mantine-color-yellow-7)',
           },
         }}
         emblaOptions={{ align: 'start', slidesToScroll: 2 }}
       >
         {actionItems.map((item, idx) => (
           <Carousel.Slide key={idx}>
             <Alert
               icon={item.icon}
               color={item.color}
               title={item.title}
               radius="md"
               variant="light"
             >
               <Text size="sm">{item.message}</Text>
             </Alert>
           </Carousel.Slide>
         ))}
       </Carousel>
   );
 }