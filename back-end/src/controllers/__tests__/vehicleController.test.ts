// import { Request, Response } from "express";
// import { AppDataSource } from "../../config/data-source";
// import {
//   createVehicle,
//   getVehicles,
//   deleteVehicle,
//   updateVehicle,
//   getVehicleById,
//   generateDescription,
// } from "../vehicleController";
// import { Vehicle } from "../../entities/Vehicle";

// // Mock TypeORM repository
// jest.mock("../../config/data-source", () => ({
//   AppDataSource: {
//     getRepository: jest.fn(),
//   },
// }));

// describe("Vehicle Controller", () => {
//   let mockRepo: any;
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let statusMock: jest.Mock;
//   let jsonMock: jest.Mock;

//   beforeEach(() => {
//     jsonMock = jest.fn();
//     statusMock = jest.fn(() => ({ json: jsonMock }));

//     res = {
//       status: statusMock,
//       json: jsonMock,
//     };

//     mockRepo = {
//       create: jest.fn(),
//       save: jest.fn(),
//       find: jest.fn(),
//       findOne: jest.fn(),
//       remove: jest.fn(),
//       merge: jest.fn(),
//     };

//     (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should create a new vehicle", async () => {
//     req = {
//       body: { vehicleType: "Car", brand: "Toyota", modelName: "Corolla", price: 25000 },
//       files: [],
//     };

//     const fakeVehicle = { id: 1, ...req.body, images: [], aiDescription: undefined };
//     mockRepo.create.mockReturnValue(fakeVehicle);
//     mockRepo.save.mockResolvedValue(fakeVehicle);

//     await createVehicle(req as Request, res as Response);

//     expect(mockRepo.create).toHaveBeenCalledWith({
//       vehicleType: "Car",
//       brand: "Toyota",
//       modelName: "Corolla",
//       color: undefined,
//       engineSize: undefined,
//       year: undefined,
//       price: 25000,
//       images: [],
//       aiDescription: undefined,
//     });
//     expect(mockRepo.save).toHaveBeenCalledWith(fakeVehicle);
//     expect(jsonMock).toHaveBeenCalledWith(fakeVehicle);
//   });

//   it("should get all vehicles", async () => {
//     const vehicles = [{ id: 1, brand: "Toyota" }];
//     mockRepo.find.mockResolvedValue(vehicles);

//     await getVehicles(req as Request, res as Response);

//     expect(mockRepo.find).toHaveBeenCalled();
//     expect(jsonMock).toHaveBeenCalledWith(vehicles);
//   });

//   it("should delete a vehicle if exists", async () => {
//     req = { params: { id: "1" } };
//     const vehicle = { id: 1 };
//     mockRepo.findOne.mockResolvedValue(vehicle);
//     mockRepo.remove.mockResolvedValue({});

//     await deleteVehicle(req as Request, res as Response);

//     expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
//     expect(mockRepo.remove).toHaveBeenCalledWith(vehicle);
//     expect(jsonMock).toHaveBeenCalledWith({ message: "Vehicle deleted successfully" });
//   });

//   it("should update a vehicle", async () => {
//     req = {
//       params: { id: "1" },
//       body: { brand: "Honda", price: 30000 },
//       files: [],
//     };

//     const vehicle = { id: 1, brand: "Toyota", price: 25000, images: [] };
//     mockRepo.findOne.mockResolvedValue(vehicle);
//     mockRepo.merge.mockImplementation((veh, update) => Object.assign(veh, update));
//     mockRepo.save.mockResolvedValue({ ...vehicle, brand: "Honda", price: 30000 });

//     await updateVehicle(req as Request, res as Response);

//     expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
//     expect(mockRepo.merge).toHaveBeenCalled();
//     expect(mockRepo.save).toHaveBeenCalledWith(
//       expect.objectContaining({ brand: "Honda", price: 30000 })
//     );
//     expect(jsonMock).toHaveBeenCalledWith(
//       expect.objectContaining({ brand: "Honda", price: 30000 })
//     );
//   });

//   it("should get vehicle by id", async () => {
//     req = { params: { id: "1" } };
//     const vehicle = { id: 1, brand: "Toyota" };
//     mockRepo.findOne.mockResolvedValue(vehicle);

//     await getVehicleById(req as Request, res as Response);

//     expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
//     expect(jsonMock).toHaveBeenCalledWith(vehicle);
//   });

//   it("should generate AI description", async () => {
//     req = { body: { vehicleType: "Car", brand: "Toyota", modelName: "Corolla", price: 25000 } };

//     // Mock OpenAI response
//     const mockAI = {
//       chat: {
//         completions: {
//           create: jest.fn().mockResolvedValue({
//             choices: [{ message: { content: "Great Car Description" } }],
//           }),
//         },
//       },
//     };
//     jest.mock("../../config/openai", () => ({ openai: mockAI }));
//     const { generateDescription } = require("../vehicleController");

//     await generateDescription(req as Request, res as Response);

//     expect(jsonMock).toHaveBeenCalledWith(
//       expect.objectContaining({ aiDescription: "Great Car Description" })
//     );
//   });
// });
