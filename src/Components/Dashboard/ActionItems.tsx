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
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

type ProfileSkill = {
  name: string;
  rating: number;
};

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
    message: 'Your next recommended training is “{course}” on {date} at {time}.',
    color: 'grape',
    icon: <IconSchool />,
    variables: ['course', 'date', 'time'],
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

type ActionItemTemplate = {
  title: string;
  message: string;
  color: string;
  icon: React.ReactNode;
  variables: string[];
};

type KnownFacts = Record<string, string | number>;

function daysSince(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  return Math.max(Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)), 0);
}

async function fetchFacts(): Promise<KnownFacts> {
  const facts: KnownFacts = {};

  // Resume update days
  const lastResumeUpdate = localStorage.getItem('last_resume_update');
  facts.days = lastResumeUpdate ? daysSince(lastResumeUpdate) : 30;

  // Attendance gap (just an example placeholder, real logic can be added)
  facts.days = Math.max(facts.days as number, 3);

  // Opportunities from localStorage
  const recommendedOpps = JSON.parse(localStorage.getItem('recommended_opportunities') || '[]');
  facts.count = recommendedOpps.length;

  // Trainings from localStorage or API
  const recommendedTrainingIds = JSON.parse(localStorage.getItem('recommendedTrainingIds') || '[]');
  if (recommendedTrainingIds.length > 0) {
    facts.course = `Training ID ${recommendedTrainingIds[0]}`;
    facts.date = 'soon';
    facts.time = 'TBD';
  } else {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/agent/TrainingsMatcher');
      if (res.data?.trainings?.length) {
        const t = res.data.trainings[0];
        facts.course = t.title;
        facts.date = t.date || 'soon';
        facts.time = t.time || 'TBD';
        facts.skill = t.skill || 'your skills';
      } else {
        facts.course = 'N/A';
        facts.date = 'N/A';
        facts.time = 'N/A';
        facts.skill = 'N/A';
      }
    } catch {
      facts.course = 'N/A';
      facts.date = 'N/A';
      facts.time = 'N/A';
      facts.skill = 'N/A';
    }
  }

  // Recommended learning — derive from profileSkills
  const skills: ProfileSkill[] = JSON.parse(localStorage.getItem('profileSkills') || '[]');
  if (skills.length > 0) {
    const topSkill = skills.reduce((prev, curr) => (curr.rating > prev.rating ? curr : prev), skills[0]);
    facts.skill = topSkill.name;
    facts.course = facts.course || `Advanced ${topSkill.name}`;
  } else {
    facts.skill = 'General';
  }

  // Fetch opportunities if local storage empty
  if (!recommendedOpps.length) {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/agent/OpportunityMatcher');
      facts.count = res.data?.opportunities?.length || 0;
    } catch {
      facts.count = 0;
    }
  }

  return facts;
}

function generateActionItems(templates: ActionItemTemplate[], facts: KnownFacts) {
  return templates.map((tpl) => {
    let msg = tpl.message;
    tpl.variables.forEach((v) => {
      msg = msg.replace(`{${v}}`, String(facts[v] ?? 'N/A'));
    });
    return {
      title: tpl.title,
      message: msg,
      color: tpl.color,
      icon: tpl.icon,
    };
  });
}

export default function ActionItemsCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [items, setItems] = useState<
    { title: string; message: string; color: string; icon: React.ReactNode }[]
  >([]);

  useEffect(() => {
    async function load() {
      const facts = await fetchFacts();
      const generated = generateActionItems(actionItemTemplates, facts);
      setItems(generated);
    }
    load();
  }, []);

  if (!items.length) {
    return <Text>No action items to display</Text>;
  }

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
      {items.map((item, idx) => (
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
