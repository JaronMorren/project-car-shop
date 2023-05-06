interface IVehicle{
  id?: string | undefined;
  model: string;
  status?: boolean | false;
  color: string;
  year: number;
  buyValue: number;
}
export default IVehicle;