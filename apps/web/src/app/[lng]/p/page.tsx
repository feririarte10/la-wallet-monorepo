'use client';

import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Icon,
  Input,
  LinkIcon,
  MinerIcon,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from '@lawallet/ui';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'styled-components';

import { useNotifications } from '@/context/NotificationsContext';

import { ImageUpload } from '@/components/ImageUpload';
import Navbar from '@/components/Layout/Navbar';
import Subnavbar from '@/components/Layout/Subnavbar';

export default function Page() {
  const theme = useTheme();
  const notifications = useNotifications();

  // Component
  const [showSheet, setShowSheet] = useState<boolean>(false);

  // Mock data
  const isMyProfile = false;
  const isFollowed = true;

  const identity = {
    name: 'Jona',
    lud16: 'dios@lawallet.ar',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dignissimos repudiandae autem dolorem numquam repellat animi.',
    website: 'https://jonallamas.com',
    meta: {
      image_url: 'https://cdn.discordapp.com/avatars/485320853786198020/51e5cf8708a462e03c18e68b19239c4d.webp?size=240',
    },
  };

  const [avatar, setAvatar] = useState<string>(identity.meta?.image_url);
  const [name, setName] = useState<string>(identity.name);
  const [description, setDescription] = useState<string>(identity.description);
  const [website, setWebsite] = useState<string>(identity.website);

  const handleExtractDomain = () => {
    const { hostname } = new URL(website);
    return hostname;
  };

  const handleSaveProfile = () => {
    // TO-DO
    // Save data on Nostr and upload image
    notifications.showAlert({
      description: 'Perfil editado exitosamente.',
      type: 'success',
    });

    setShowSheet(false);
  };

  return (
    <>
      <Navbar showBackPage={true} title={identity.lud16} overrideBack="/dashboard" />

      <Container size="small">
        <Divider y={16} />
        <Flex align="end" justify="space-between">
          <Avatar size={20} alt={identity.name} src={avatar || '/profile.png'} />
          {isMyProfile ? (
            <Button size="small" variant="bezeled" color="secondary" onClick={() => setShowSheet(true)}>
              Editar
            </Button>
          ) : (
            <Flex gap={8} justify="end">
              {isFollowed ? (
                <div>
                  <Button color={'error'} variant={'bezeled'} size="small">
                    {'Dejar de seguir'}
                  </Button>
                </div>
              ) : (
                <div>
                  <Button size="small">{'Seguir'}</Button>
                </div>
              )}
              {/* <div>
                <Button size="small" variant="bezeledGray">
                  Zapear
                </Button>
              </div> */}
            </Flex>
          )}
        </Flex>
        <Divider y={16} />
        {identity.name && <Text isBold>{identity.name}</Text>}
        <Divider y={4} />
        {identity.description && <Text>{identity.description}</Text>}
        <Divider y={16} />
        <Flex gap={8}>
          {website && (
            <Flex gap={4} align="center" flex={0}>
              <Icon size="small">
                <LinkIcon color={theme.colors.gray50} />
              </Icon>
              <Link href={website} target="_blank" rel="nofollow">
                <Text size="small" isBold color={theme.colors.primary}>
                  {handleExtractDomain()}
                </Text>
              </Link>
            </Flex>
          )}
          <Flex gap={4} align="center">
            <Icon size="small">
              <MinerIcon color={theme.colors.gray50} />
            </Icon>
            <Text color={theme.colors.gray50} size="small">
              Enero, 2021
            </Text>
          </Flex>
        </Flex>
        <Divider y={16} />
        <Flex gap={8}>
          <Flex gap={4} flex={0} align="center">
            <Text isBold>69</Text>
            <Text size="small">siguiendo</Text>
          </Flex>
          <Flex gap={4} flex={0} align="center">
            <Text isBold>619</Text>
            <Text size="small">seguidores</Text>
          </Flex>
        </Flex>
        <Divider y={16} />
        <Tabs>
          <TabList>
            <Tab active={true}>Badges</Tab>
          </TabList>
          <TabPanels>
            <TabPanel show={true}>
              <Text size="small" color={theme.colors.gray50}>
                25 coleccionados
              </Text>
              <Divider y={8} />
              <Flex direction="column" gap={16} flex={1}>
                <Flex gap={16}>
                  <Card>
                    <Link href="#">
                      <Avatar
                        size={20}
                        alt=""
                        src="https://cdn.discordapp.com/avatars/485320853786198020/51e5cf8708a462e03c18e68b19239c4d.webp?size=240"
                      />
                    </Link>
                  </Card>
                  <Card>
                    <Link href="#">
                      <Avatar
                        size={20}
                        alt=""
                        src="https://cdn.discordapp.com/avatars/485320853786198020/51e5cf8708a462e03c18e68b19239c4d.webp?size=240"
                      />
                    </Link>
                  </Card>
                  <Card>
                    <Link href="#">
                      <Avatar
                        size={20}
                        alt=""
                        src="https://cdn.discordapp.com/avatars/485320853786198020/51e5cf8708a462e03c18e68b19239c4d.webp?size=240"
                      />
                    </Link>
                  </Card>
                </Flex>
                <Flex gap={16}>
                  <Card>
                    <Link href="#">
                      <Avatar
                        size={20}
                        alt=""
                        src="https://cdn.discordapp.com/avatars/485320853786198020/51e5cf8708a462e03c18e68b19239c4d.webp?size=240"
                      />
                    </Link>
                  </Card>
                  <Card>
                    <Link href="#">
                      <Avatar
                        size={20}
                        alt=""
                        src="https://cdn.discordapp.com/avatars/485320853786198020/51e5cf8708a462e03c18e68b19239c4d.webp?size=240"
                      />
                    </Link>
                  </Card>
                  <Card>
                    <Link href="#">
                      <Avatar
                        size={20}
                        alt=""
                        src="https://cdn.discordapp.com/avatars/485320853786198020/51e5cf8708a462e03c18e68b19239c4d.webp?size=240"
                      />
                    </Link>
                  </Card>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Divider y={120} />
      </Container>
      {isMyProfile && (
        <Sheet isOpen={showSheet} onClose={() => setShowSheet(false)} title="Editar perfil">
          <Container size="small">
            <Flex direction="column" flex={1}>
              <ImageUpload />
              <Divider y={16} />
              <Text size="small" color={theme.colors.gray50}>
                Información general
              </Text>
              <Divider y={16} />
              <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
              <Divider y={8} />
              <Textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Divider y={4} />
              <Flex justify="end">
                <Text size="small" color={theme.colors.gray50} align="right">
                  0/256 caracteres permitidos.
                </Text>
              </Flex>
            </Flex>
            <Flex gap={8}>
              <Button variant="borderless" onClick={() => setShowSheet(false)}>
                Cancelar
              </Button>
              <Button color="secondary" onClick={handleSaveProfile}>
                Guardar
              </Button>
            </Flex>
          </Container>
        </Sheet>
      )}

      <Subnavbar path="profile" />
    </>
  );
}
