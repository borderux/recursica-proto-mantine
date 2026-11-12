import { Link as RouterLink } from "react-router";
import {
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
} from "@recursica/adapter-mantine-v8";
import { prototypes } from "./prototypes";

function UsageInfo() {
  // Same prototype the picker button jumps to — first alphabetically, same
  // order as Home's list — so this page still works once more prototypes
  // exist instead of hard-coding one.
  const [firstPrototype] = [...prototypes].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Link renderRoot={(props) => <RouterLink to="/" {...props} />}>
          ← Back to Prototypes
        </Link>
        <Heading order={1}>How to Use</Heading>
        <Text>
          Every prototype in this app can define one or more{" "}
          <strong>stories</strong> — named variants that swap in different data
          or API behavior, like a normal load, an empty state, or an error.
        </Text>
        <Stack gap="xs">
          <Heading order={2}>Opening the stories panel</Heading>
          <Text>
            Add <code>?story</code> or <code>?stories</code> to the end of any
            prototype&apos;s URL to open the story picker. It lists every story
            available for that prototype by name and description — click one to
            switch to it.
          </Text>
          {firstPrototype && (
            <Button
              renderRoot={(props) => (
                <RouterLink
                  to={`/prototypes/${firstPrototype.slug}?stories`}
                  {...props}
                />
              )}
            >
              Open the stories panel
            </Button>
          )}
        </Stack>
        <Stack gap="xs">
          <Heading order={2}>Linking directly to a story</Heading>
          <Text>
            Add <code>?story=&lt;id&gt;</code> (for example,{" "}
            <code>?story=2</code>) to jump straight to a specific story without
            opening the picker — handy for sharing a link to one exact state.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}

export default UsageInfo;
