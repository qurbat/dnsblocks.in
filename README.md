# Poisoned Wells
## Examining the scale of DNS censorship in India

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Last Updated](https://img.shields.io/badge/Last%20Updated-March%202026-blue.svg)](https://dnsblocks.in)

**View the project website [here.](https://dnsblocks.in)**

This repository contains the data and documentation for **Poisoned Wells**, a large-scale survey of DNS censorship across 6 major Indian Internet Service Providers (ISPs).

## Accessing the data

### 1. Interactive explorer

Visit [dnsblocks.in/#explorer](https://dnsblocks.in/#explorer) to explore the full dataset of 43,083 blocked domains using the interactive web interface.

**Features:**
- Filter by ISP
- Search specific domains
- Filter by domain category
- Filter by Top-Level Domain (TLD)
- Sort by Tranco popularity ranking
- Toggle between "blocked by ANY", "blocked by ALL", or "blocked exclusively by"

### 2. Compiled blocklist (CSV)

**File:** [`data/compiled_blocklist.csv`](data/compiled_blocklist.csv)
**Size:** 1.6 MB
**Format:** CSV with headers

Contains all 43,083 blocked domains with:
- Domain name
- Category
- Tranco popularity rank
- Blocking status for each of the 6 ISPs

**Example row:**
```csv
domain,category,tranco_rank,ACT,AIRTEL,CONNECT,JIO,MTNL,YOU
0-123movies.com,MOV,-,0,1,0,0,0,0
```

**Blocking status values:**
- `1` = Blocked
- `0` = OK/Not blocked
- Other values: `TIMEOUT`, `NXDOMAIN`, `SERVFAIL`, `REFUSED`, `ERROR`

### 3. Raw DNS measurements

**Total size:** ~68 GB compressed, ~760 GB uncompressed **Format:** Compressed `jsonl` files (one per ISP) **Contains:** 1.76 billion DNS measurements

Measurements include query domain, response code, response IPs, timestamp (and additional records in some cases.)

**View download links and detailed format [here.](data/README.md#raw-dns-measurements-by-isp)**

## Dataset overview

### ISPs covered

| Full Name | ASN |
|-----------|-----|
| Atria Convergence Technologies | AS18209 |
| Bharti Airtel | AS9498 |
| Connect Broadband | AS17917 |
| Reliance Jio | AS55836 |
| Mahanagar Telephone Nigam Ltd. | AS17813 |
| You Broadband | AS18207 |

### Categories

The blocklist uses categories based on an expanded version of [Citizen Lab's test list taxonomy](https://github.com/citizenlab/test-lists/blob/master/lists/00-LEGEND-new_category_codes.csv#L1).

**View full category definitions [here.](data/README.md#category-definitions)**

## Citation

If you use this data or research in your work, please cite:

### For the dataset:

```bibtex
@misc{poisonedwellsdata,
  author = "Karan Saini",
  title  = "Compiled blocklist and DNS measurement data from the Poisoned Wells project",
  year   = "2026",
  month  = "March",
  url    = "https://github.com/qurbat/dnsblocks.in/tree/main/data"
}
```

### For the report:

```bibtex
@misc{poisonedwellsreport,
  author = "Karan Saini",
  title  = "Poisoned Wells: Examining the scale of DNS censorship in India",
  year   = "2026",
  month  = "March",
  url    = "https://dnsblocks.in"
}
```

## License

All data (compiled block list and raw DNS measurements) is released under the **[Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)** license.

## Acknowledgments

This research was supported by:

- **[Open Technology Fund](https://www.opentech.fund/)** - through the Information Controls Research Program
- **[Internet Governance Project](https://www.internetgovernance.org/)** - host organization at the Georgia Institute of Technology's School of Public Policy, providing institutional support and technical guidance

---

<sub>Website fonts: [Terminal Grotesque](https://velvetyne.fr/fonts/terminal-grotesque/) by Raphaël Bastide with contribution of Jérémy Landes, and [Steps Mono](https://velvetyne.fr/fonts/steps-mono/) by Jean-Baptiste Morizot and Raphaël Bastide. Distributed by [velvetyne.fr](https://velvetyne.fr).</sub>
