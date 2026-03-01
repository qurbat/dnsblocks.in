This directory contains the data from the "Poisoned Wells: Examining the scale of DNS censorship in India" study.

## Available datasets

### Compiled blocklist

**File:** `compiled_blocklist.csv`

This is the processed dataset containing 43,083 blocked domains across 6 Indian ISPs. The file includes:

- **domain**: The blocked domain name
- **category**: Content category (e.g., MOV, HOST, UNCAT, PORN, MAL, GMB)
- **tranco_rank**: Tranco popularity ranking (or `-` for unranked domains)
- **ISP columns** (ACT, AIRTEL, CONNECT, JIO, MTNL, YOU): Blocking status per ISP
  - `1` = Blocked
  - `0` = OK/Not blocked
  - Other values: TIMEOUT, NXDOMAIN, SERVFAIL, REFUSED, ERROR

### Category definitions

The category definitions are based on Citizen Lab's [test list taxonomy](http://github.com/citizenlab/test-lists/blob/master/lists/00-LEGEND-new_category_codes.csv#L1), with modifications and new additions.

| Code | Category | Description |
|------|----------|-------------|
| **ALDR** | Alcohol & drugs | Sites devoted to the use, paraphernalia, and sale of drugs and alcohol irrespective of the local legality. |
| **REL** | Religion | Sites devoted to discussion of religious issues, both supportive and critical, as well as discussion of minority religious groups. |
| **PORN** | Pornography | Hard-core and soft-core pornography. |
| **PROV** | Provocative attire | Websites which show provocative attire and portray women in a sexual manner, wearing minimal clothing. |
| **POLR** | Political criticism | Content that offers critical political viewpoints (includes critical authors and bloggers, oppositional political organizations, and pro-democracy and anti-corruption content). |
| **HUMR** | Human rights issues | Sites dedicated to discussing human rights issues in various forms. Includes women's rights and rights of minority ethnic groups. |
| **ENV** | Environment | Pollution, international environmental treaties, deforestation, environmental justice, disasters, etc. |
| **MILX** | Terrorism and militants | Sites promoting terrorism, violent militant or separatist movements. **Organizations officially banned by the Government of India are included in this list.** |
| **HATE** | Hate speech | Content that disparages particular groups or persons based on race, sex, sexuality, or other characteristics. |
| **NEWS** | News media | This category includes major news outlets (BBC, CNN, etc.) as well as regional news outlets and independent media. |
| **XED** | Sex education | Includes contraception, abstinence, STDs, healthy sexuality, teen pregnancy, rape prevention, abortion, sexual rights, and sexual health services. |
| **PUBH** | Public health | HIV, SARS, bird flu, centers for disease control, World Health Organization, etc. |
| **GMB** | Gambling | Online gambling sites (includes casino games and sports betting). |
| **ANON** | Anonymization and circumvention tools | Sites that provide tools used for anonymization, circumvention, proxy-services and encryption. |
| **DATE** | Online dating | Online dating services which can be used to meet people, post profiles, chat, etc. |
| **GRP** | Social networking | Social networking tools and platforms. |
| **LGBT** | LGBT | A range of gay-lesbian-bisexual-transgender, and queer issues (excluding pornography). |
| **FILE** | File sharing | Sites and tools used to share files, including cloud-based file storage, torrents and P2P file-sharing tools. |
| **HACK** | Hacking tools | Sites dedicated to computer security, including news and tools. Includes malicious and non-malicious content. |
| **COMT** | Communication tools | Sites and tools for individual and group communications, including webmail, VoIP, instant messaging, chat, and mobile messaging applications. |
| **MMED** | Media sharing | Video, audio, or photo sharing platforms. |
| **HOST** | Hosting and blogging platforms | Web hosting services, blogging, and other online publishing platforms. |
| **SRCH** | Search engines | Search engines and portals. |
| **GAME** | Gaming | Online games and gaming platforms, excluding gambling sites. |
| **CULTR** | Culture | Content relating to entertainment, history, literature, music, film, books, satire, and humor. |
| **ECON** | Economics | General economic development and poverty related topics, agencies, and funding opportunities. |
| **GOVT** | Government | Government-run websites, including military sites. |
| **COMM** | E-commerce | Websites of commercial services and products. |
| **CTRL** | Control content | Benign or innocuous content used as a control. |
| **IGO** | Intergovernmental organizations | Websites of intergovernmental organizations such as the United Nations. |
| **MISC** | Miscellaneous content | Sites that don't fit in any category. |
| **MAL** | **Malicious content** | **Websites designed to phish, defraud, or otherwise harm users, including C2 domains and websites used in malware campaigns. Enriched with sites found in public security lists, e.g., github.com/maltrail/trails/static (as of 22 Sep, 2025). There may be an overlap with websites in the IPTM category.** |
| **IPTM** | **IP/trademark violations** | **Intellectual property violations, trademark, and copyright disputes, including brand impersonation sites. There may be an overlap with websites in the MAL category.** |
| **COIN** | **Cryptocurrency** | **Cryptocurrency exchange websites and related cryptocurrency trading platforms.** |
| **EDU** | **Education** | **Educational websites and platforms, including academic resources and educational institutions.** |
| **MOV** | **Movies & TV** | **Piracy websites specifically dedicated to movies and TV shows, including streaming and download sites for video content.** |
| **MUS** | **Music & audio** | **Piracy websites explicitly dedicated to music and audio files.** |
| **VISA** | **Visa & immigration** | **Visa application and immigration-related websites (may be official government sites, unofficial service providers, or scam websites).** |
| **BIZ** | **Business** | **Websites that appear to be related to commercial businesses and corporate entities.** |
| **PASTE** | **Text sharing** | **Text sharing websites and paste services used for sharing code snippets, documents, and other text-based content.** |
| **LIVE** | **Live streaming piracy** | **Piracy websites providing livestreams of pay-per-view events such as football, cricket, MMA, and other sports or entertainment content.** |
| **ESC** | **Escort services** | **Websites advertising escort services.** |
| **ICAP** | **Invite-based child abuse pyramid** | **Child abuse material. Domains in this category have been reported to law enforcement and obscured in the data release.** |
| **UNCAT** | **Uncategorized** | **Uncategorized domains, distinct from the MISC category. The compiled blocklist includes generic uncategorized domains as well as Numeric Domain Names (NDNs), Internationalized Domain Names (IDNs), and domains with the .yokohama TLD.** |

---

### Raw DNS measurements by ISP

The raw DNS measurement data is available as compressed `jsonl` files, broken down by ISP:

| ISP | ASN | File Name | Source Files | Compressed Size | Uncompressed Size | Download |
|-----|-----|-----------|--------------|-----------------|-------------------|----------|
| ACT | AS18209 | `act_measurements_concat.jsonl.gz` | 6 files, concatenated | 7.6 GB | 90.4 GB | [Link](https://drive.google.com/file/d/1Sn_nyW3nsHg49Gqeszw33ZHMNg7H_CtQ/view?usp=share_link) |
| Airtel | AS9498 | `airtel_measurements_concat.jsonl.gz` | 7 files, concatenated | 8.9 GB | 105.3 GB | [Link](https://drive.google.com/file/d/1H9qsMMGmSWFU49cjRkWOmmDLcObBwoi5/view?usp=share_link) |
| Connect Broadband | AS17917 | `connect_measurements_concat.jsonl.gz` | 2 files, concatenated | 19 GB | 208.2 GB | [Link](https://drive.google.com/file/d/1a0hRoz3HY7uyDL3pMeiPeRQCP9-EXels/view?usp=share_link) |
| Jio | AS55836 | `jio_measurements_concat.jsonl.gz` | 6 files, concatenated | 7.8 GB | 90.8 GB | [Link](https://drive.google.com/file/d/1Pvn_5vhx8Zi8i2uODrZj0bCtITcT-6Ol/view?usp=share_link) |
| MTNL | AS17813 | `mtnl_measurements.jsonl.gz` | 1 file | 9.7 GB | 110.8 GB | [Link](https://drive.google.com/file/d/1jBJatVHEODyztZG5bssdFPlH8LR6VhVU/view?usp=share_link) |
| You Broadband | AS18207 | `you_measurements_concat.jsonl.gz` | 3 files, concatenated | 15 GB | 154.5 GB | [Link](https://drive.google.com/file/d/1_4yGN7-Ny7K7K0Oh80snf9ObzIgLkJOv/view?usp=share_link) |

**Total compressed size:** ~68 GB
**Total uncompressed size:** ~760 GB

These files contain the raw DNS query measurements collected from March to September 2025, representing 1.76 billion DNS queries across 294 million registered domains.

## Data format

### Compiled blocklist CSV format

```csv
domain,category,tranco_rank,ACT,AIRTEL,CONNECT,JIO,MTNL,YOU
example.com,UNCAT,12345,1,1,0,1,0,0
```

### Raw measurements format

Each line in the compressed `jsonl` files contains a JSON object representing a DNS measurement.

- Query domain
- Response code
- Response IP addresses
- Timestamp
- Additional records (Connect Broadband and You Broadband specifically)

## License

All data is released under **Creative Commons BY-NC-SA 4.0** license.

## Citation

If you use this data in your research, please cite:

```bibtex
@misc{poisonedwellsdata,
  author      = "Karan Saini",
  title       = "Compiled blocklist and DNS measurement data from the Poisoned Wells project",
  year        = "2026",
  month       = "March",
  url         = "https://github.com/qurbat/dnsblocks.in/tree/main/data"
}
```
