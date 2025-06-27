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
  Paper,
  Code,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import {
  IconCheck,
  IconX,
  IconFile,
  IconFilePlus,
} from '@tabler/icons-react';

const BACKEND_URL = 'http://127.0.0.1:5000';

interface Skill {
  technologies_known: string;
  years_of_experience: number;
  strength_of_skill: number;
}

interface Certification {
  certification_name: string;
  issued_date: string;
  valid_till: string | null;
}

interface Professional {
  last_worked_organization: string | null;
  recent_role: string | null;
  recent_project: string | null;
  recent_start_date: string | null;
  recent_project_release_date: string | null;
}

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(false);
  const [rawJson, setRawJson] = useState<any>(null);

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

      const response = await fetch(`${BACKEND_URL}/api/agent/ResumeExtractor`, {
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
      if (!data?.data?.skills) {
        setError('No skills found in resume.');
        setLoading(false);
        return;
      }

      setSkills(data.data.skills || []);
      setCertifications(data.data.certifications || []);
      setProfessional(data.data.professional || null);
      setRawJson(data.data);
      setSuccess(true);
      setError(false);
    } catch (e: any) {
      setError('Error uploading resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder shadow="md" radius="md" p="lg" maw={800} mx="auto">
      <Stack gap="md">
        <Title order={3}>Upload Your Resume</Title>
        <Text size="sm" c="dimmed">
          Drag and drop your resume here, or click to select a file. Accepted formats: PDF (max 5MB).
        </Text>

        <Dropzone
          onDrop={(files) => {
            setFile(files[0]);
            setError(false);
            setSuccess(false);
            setSkills([]);
            setCertifications([]);
            setProfessional(null);
            setRawJson(null);
          }}
          onReject={() => {
            setFile(null);
            setError('File type not supported or too large');
            setSuccess(false);
            setSkills([]);
            setCertifications([]);
            setProfessional(null);
            setRawJson(null);
          }}
          maxSize={5 * 1024 ** 2}
          accept={[MIME_TYPES.pdf]}
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

        {/* RAW JSON OUTPUT */}
        {rawJson && (
          <Paper shadow="xs" p="sm" withBorder mt="md">
            <Title order={5} mb={5}>Extracted JSON</Title>
            <Code block style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 13, background: "inherit" }}>
              {JSON.stringify(rawJson, null, 2)}
            </Code>
          </Paper>
        )}

        {/* Pretty display */}
        {skills.length > 0 && (
          <Stack gap="sm" mt="lg">
            <Title order={4}>Extracted Skills</Title>
            {skills.map((skill, i) => (
              <Group key={skill.technologies_known + i} justify="space-between">
                <Text>
                  {skill.technologies_known} ({skill.years_of_experience} yrs)
                </Text>
                <Rating value={skill.strength_of_skill} readOnly count={10} />
              </Group>
            ))}
          </Stack>
        )}

        {certifications.length > 0 && (
          <Stack gap="sm" mt="lg">
            <Title order={4}>Certifications</Title>
            {certifications.map((cert, i) => (
              <Group key={cert.certification_name + i} justify="space-between">
                <Text>
                  {cert.certification_name}
                </Text>
                <Text size="xs" c="dimmed">
                  Issued: {cert.issued_date} | Valid till: {cert.valid_till || 'N/A'}
                </Text>
              </Group>
            ))}
          </Stack>
        )}

        {professional && (
          <Stack gap="sm" mt="lg">
            <Title order={4}>Professional Details</Title>
            <Text>Organization: {professional.last_worked_organization || 'N/A'}</Text>
            <Text>Role: {professional.recent_role || 'N/A'}</Text>
            <Text>Project: {professional.recent_project || 'N/A'}</Text>
            <Text>Start Date: {professional.recent_start_date || 'N/A'}</Text>
            <Text>Release Date: {professional.recent_project_release_date || 'N/A'}</Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}