import type { Country } from "@/types/country";
import type { Pathway } from "@/types/pathway";
import type { Material } from "@/types/material";

import australia from "../../data/countries/australia.json";
import germany from "../../data/countries/germany.json";
import newZealand from "../../data/countries/new-zealand.json";
import japan from "../../data/countries/japan.json";
import ireland from "../../data/countries/ireland.json";
import unitedStates from "../../data/countries/united-states.json";
import southKorea from "../../data/countries/south-korea.json";
import canada from "../../data/countries/canada.json";
import france from "../../data/countries/france.json";
import globalCountry from "../../data/countries/global.json";
import netherlands from "../../data/countries/netherlands.json";

import australiaWhv462 from "../../data/pathways/australia-whv-462.json";
import germanyAusbildung from "../../data/pathways/germany-ausbildung.json";
import newZealandWhv from "../../data/pathways/new-zealand-whv.json";
import japanStudentVisa from "../../data/pathways/japan-student-visa.json";
import usaJ1Itp from "../../data/pathways/usa-j1-itp.json";
import irelandWhv from "../../data/pathways/ireland-whv.json";
import southKoreaH1 from "../../data/pathways/south-korea-h1.json";
import canadaCoop from "../../data/pathways/canada-coop.json";
import franceWhv from "../../data/pathways/france-whv.json";
import wwoofGlobal from "../../data/pathways/wwoof-global.json";
import germanyAuPair from "../../data/pathways/germany-au-pair.json";
import japanJet from "../../data/pathways/japan-jet.json";
import netherlandsSearchYear from "../../data/pathways/netherlands-search-year.json";
import germanyOpportunityCard from "../../data/pathways/germany-opportunity-card.json";
import cscInternship from "../../data/pathways/csc-internship.json";
import aiesecInternship from "../../data/pathways/aiesec-internship.json";

import passport from "../../data/materials/passport.json";
import ieltsReport from "../../data/materials/ielts-report.json";
import criminalCheck from "../../data/materials/criminal-check.json";
import bankStatement from "../../data/materials/bank-statement.json";
import degreeCertificate from "../../data/materials/degree-certificate.json";
import academicTranscript from "../../data/materials/academic-transcript.json";
import idPhoto from "../../data/materials/id-photo.json";
import healthCheck from "../../data/materials/health-check.json";
import languageCertificate from "../../data/materials/language-certificate.json";
import healthInsurance from "../../data/materials/health-insurance.json";
import visaApplicationForm from "../../data/materials/visa-application-form.json";
import personalStatement from "../../data/materials/personal-statement.json";

export const countries: Country[] = [
  australia as Country,
  germany as Country,
  newZealand as Country,
  japan as Country,
  ireland as Country,
  unitedStates as Country,
  southKorea as Country,
  canada as Country,
  france as Country,
  globalCountry as Country,
  netherlands as Country,
];

export const pathways: Pathway[] = [
  australiaWhv462 as Pathway,
  germanyAusbildung as Pathway,
  newZealandWhv as Pathway,
  japanStudentVisa as Pathway,
  usaJ1Itp as Pathway,
  irelandWhv as Pathway,
  southKoreaH1 as Pathway,
  canadaCoop as Pathway,
  franceWhv as Pathway,
  wwoofGlobal as Pathway,
  germanyAuPair as Pathway,
  japanJet as Pathway,
  netherlandsSearchYear as Pathway,
  germanyOpportunityCard as Pathway,
  cscInternship as Pathway,
  aiesecInternship as Pathway,
];

export const materials: Material[] = [
  passport as Material,
  ieltsReport as Material,
  criminalCheck as Material,
  bankStatement as Material,
  degreeCertificate as Material,
  academicTranscript as Material,
  idPhoto as Material,
  healthCheck as Material,
  languageCertificate as Material,
  healthInsurance as Material,
  visaApplicationForm as Material,
  personalStatement as Material,
];

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getPathway(slug: string): Pathway | undefined {
  return pathways.find((p) => p.slug === slug);
}

export function getMaterial(id: string): Material | undefined {
  return materials.find((m) => m.id === id);
}

export function getPathwaysByCountry(countrySlug: string): Pathway[] {
  return pathways.filter((p) => p.countrySlug === countrySlug);
}

export function getFeaturedPathways(): Pathway[] {
  return pathways.filter((p) => p.isFeatured);
}
