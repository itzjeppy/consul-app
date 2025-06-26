import {
   Alert,
   Box,
   Text,
   Title,
 } from '@mantine/core';
 import { Carousel } from '@mantine/carousel';
 import Autoplay from 'embla-carousel-autoplay';
 import {
   IconAlertCircle,
   IconBulb,
   IconCalendarCheck,
   IconBriefcase,
   IconSchool,
 } from '@tabler/icons-react';
 import { useRef } from 'react';y
 
 const actionItems = [
   {
     title: 'Resume Update Required',
     message: "Your resume hasn't been updated in the last 30 days. Please review and update.",
     color: 'blue',
     icon: <IconAlertCircle />,
   },
   {
     title: 'Attendance Missing',
     message: 'You haven’t marked attendance for the last 2 days. Please confirm or update.',
     color: 'red',
     icon: <IconCalendarCheck />,
   },
   {
     title: 'New Opportunities Available',
     message: '3 new projects match your skills. Apply now to increase your chances.',
     color: 'yellow',
     icon: <IconBriefcase />,
   },
   {
     title: 'Training Reminder',
     message: 'You have a pending training scheduled for tomorrow at 10AM.',
     color: 'green',
     icon: <IconSchool />,
   },
   {
     title: 'Recommended Learning',
     message: 'Try “Mastering TypeScript” to enhance your JavaScript skills.',
     color: 'grape',
     icon: <IconBulb />,
   },
 ];
 
 export default function ActionItemsCarousel() {
   const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
 
   return (
     <Box>
       <Title order={4} mb="md">
         Action Items
       </Title>
 
       <Carousel
         slideGap="md"
         slideSize="100%"
         withIndicators
         plugins={[autoplay.current]}
         styles={{
           indicator: {
             backgroundColor: 'var(--mantine-color-yellow-7)',
           },
         }}
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
     </Box>
   );
 }