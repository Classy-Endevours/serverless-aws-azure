import DatabaseModal from ".";

class ReportRepo extends DatabaseModal {
    find = (options = {}) => {
        return this.db.reports.findMany(options);
    }
}

export default new ReportRepo()