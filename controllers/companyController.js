const User = require('../models/user');
const gascompany = require('../models/gascompany');
const companyController = {
    creategasCompany: async (request, response) => {
        try {
            const { name, location } = request.body;
            const newCompany = new gascompany({
                name,
                location,
                createdBy: request.userId

            });
            await newCompany.save();

            response.status(201).json({ message: 'Company is created successfully', company: newCompany });
        } catch (error) {
            response.status(500).json ({ message: error.message });
        }
    },
    getgasCompanies: async (request, response) => {
        try {
            const companies = await gascompany.find();

            response.status(200).json({ companies });
        } catch (error) {
            response.status(500).json({ message: error.message});
        }
    },
    getgasCompany: async (request, response) => {
        try {
            const { companyId } = request.params;

            const company = await gascompany.findById(companyId);

            response.status(200).json({ company });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    updategasCompany: async (request, response) => {
        try {
            
            const { companyId } = request.params;

            const { name, location } = request.body;

            if (name && location ) {
                 const updatedgasCompany = await gascompany.findByIdAndUpdate(
                    companyId, { name, location, description }, { new: true }
                 );
            } else if (name && location) {
                const updatedgasCompany = await gascompany.findByIdAndUpdate(
                    companyId, { name, location }, { new: true }
                );
            } else if (location) {
                const updatedgasCompany = await gascompany.findByIdAndUpdate(
                    companyId, { location }, { new: true }
                )
            }
            response.status(200).json({ message: 'Company updated successfully', company: updatedgasCompany });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    deletegasCompany: async (request, response) => {
        try {
            const { companyId } = request.params;

            await gascompany.findByIdAndDelete(companyId);

            response.status(200).json({ message: 'Company deleted successfully '});
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    bookgasCompanyslot: async (request, response) => {
        try{
            const { companyId } = request.params;
            const userId = request.userId;
            const company = await gascompany.findById(companyId);
            const user = await User.findById(userId);
            if (company.applicants.includes(userId)) {
                return response.status(400).json({ message: 'you have already booked your slot' });
            }
            company.applicants.push(userId)

            await company.save();
            response.status(200).json({ message: 'You have successfully booked the slot', company });


        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    getbookedslots: async (request, response) => {
            console.log(request.userId);
        try {
            const userId = request.userId;
            const companies = await gascompany.find();
            const bookedslots = companies.filter(company => company.applicants && company.applicants.includes(userId));

            response.status(200).json({ slots: bookedslots });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}
module.exports = companyController