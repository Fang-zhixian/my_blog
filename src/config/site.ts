export interface ContactLink {
  platform: 'github' | 'x' | 'twitter' | 'email' | 'linkedin' | 'website' | 'other';
  label: string;
  href: string;
}

export const siteConfig = {
  name: 'DESIGNER.BLOG',
  title: 'DESIGNER.BLOG',
  description: '极简风格的个人博客',
  url: 'https://greedywolf.tech',
  author: '方植贤',
  twitterHandle: '@greedywolf',
  contacts: [
    {
      platform: 'github',
      label: 'GitHub',
      href: 'https://github.com/Fang-zhixian',
    },
    {
      platform: 'x',
      label: 'X',
      href: 'https://x.com/your_handle',
    },
    {
      platform: 'email',
      label: 'Email',
      href: 'mailto:hello@example.com',
    },
  ] satisfies ContactLink[],
};
