export type PackageScreenshot = {
  id: number;
  packageId: number;
  name: string;
  createdAt: string;
};

export type PackageResponse = {
  id: number;
  name: string;
  screenshots: PackageScreenshot[];
  createdAt: string;
};
