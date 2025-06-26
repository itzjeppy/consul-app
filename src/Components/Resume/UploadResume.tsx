import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Notification,
  Rating,
  useMantineTheme,
  useComputedColorScheme,
  Loader,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import {
  IconUpload,
  IconCheck,
  IconX,
  IconFile,
  IconFilePlus,
} from '@tabler/icons-react';

interface Skill {
  name: string;
  rating: number;
}

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume file.');
      setSuccess(false);
      return;
    }
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err?.error || 'Failed to process resume.');
        setLoading(false);
        return;
      }

      const data = await response.json();
      // Assume API returns: { data: { skills: [{ name: string }], history: [...] } }
      if (!data?.data?.skills) {
        setError('No skills found in resume.');
        setLoading(false);
        return;
      }

      const extractedSkills: Skill[] = data.data.skills.map((skill: any) => ({
        name: skill.name || skill,
        rating: 0,
      }));

      setSkills(extractedSkills);
      setSuccess(true);
      setError(false);
    } catch (e: any) {
      setError('Error uploading resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillRating = (index: number, value: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index].rating = value;
    setSkills(updatedSkills);
  };

  return (
    <Card withBorder shadow="md" radius="md" p="lg" maw={800} mx="auto">
      <Stack gap="md">
        <Title order={3}>Upload Your Resume</Title>
        <Text size="sm" c="dimmed">
          Drag and drop your resume here, or click to select a file. Accepted formats: PDF, DOCX (max 5MB).
        </Text>

        <Dropzone
          onDrop={(files) => {
            setFile(files[0]);
            setError(false);
            setSuccess(false);
            setSkills([]);
          }}
          onReject={() => {
            setFile(null);
            setError('File type not supported or too large');
            setSuccess(false);
            setSkills([]);
          }}
          maxSize={5 * 1024 ** 2}
          accept={[MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx]}
          radius="xl"
          p="xl"
          styles={{
            root: {
              borderColor: theme.colors.indigo[5],
              borderStyle: "groove",
              backgroundColor:
                computedColorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              transition: 'background-color 0.2s ease',
            },
          }}
        >

          <Dropzone.Accept>
            <Group justify="center" align="center" style={{ minHeight: 200, pointerEvents: 'none' }}>
              <IconCheck size={40} color="green" />
              <Text size="sm" ta="center" mt="sm" c="green">
                Drop your file to upload
              </Text>
            </Group>
          </Dropzone.Accept>

          <Dropzone.Reject>
            <Group justify="center" align="center" style={{ minHeight: 200, pointerEvents: 'none' }}>
              <IconX size={40} color="red" />
              <Text size="sm" ta="center" mt="sm" c="red">
                File type not supported or too large
              </Text>
            </Group>
          </Dropzone.Reject>

          <Dropzone.Idle>
            <Group justify="center" align="center" style={{ minHeight: 200, pointerEvents: 'none' }}>
              <IconFilePlus size={40} color={theme.colors.indigo[5]} />
              <Text size="sm" ta="center" mt="sm" c="gray.7">
                Drag & drop or click to select your resume
              </Text>
            </Group>
          </Dropzone.Idle>
        </Dropzone>

        {file && (
          <Group justify="space-between" mt="xs">
            <Group gap="xs">
              <IconFile size={20} />
              <Text size="sm">{file.name}</Text>
            </Group>
            <Text size="xs" c="dimmed">
              {(file.size / 1024).toFixed(1)} KB
            </Text>
          </Group>
        )}

        {loading && <Loader color="indigo" />}

        {success && !loading && (
          <Notification
            color="green"
            icon={<IconCheck size={18} />}
            onClose={() => setSuccess(false)}
          >
            Resume uploaded and processed successfully!
          </Notification>
        )}

        {error && (
          <Notification
            color="red"
            icon={<IconX size={18} />}
            onClose={() => setError(false)}
          >
            {error}
          </Notification>
        )}

        <Group justify="flex-end">
          <Button onClick={handleUpload} disabled={!file || loading} color="indigo">
            Upload Resume
          </Button>
        </Group>

        {skills.length > 0 && (
          <Stack gap="sm" mt="lg">
            <Title order={4}>Rate Your Skills</Title>
            {skills.map((skill, i) => (
              <Group key={skill.name} justify="space-between">
                <Text>{skill.name}</Text>
                <Rating value={skill.rating} onChange={(val) => handleSkillRating(i, val)} />
              </Group>
            ))}
            <Group justify="flex-end" mt="md">
              <Button
                color="indigo"
                onClick={() => {
                  localStorage.setItem('profileSkills', JSON.stringify(skills));
                  window.location.href = '/profile';
                }}
              >
                Submit
              </Button>
            </Group>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}