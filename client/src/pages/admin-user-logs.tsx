import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserLog } from "@shared/schema";

export default function AdminUserLogs() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["/api/admin/logs"],
  });

  const filteredLogs = (logs as UserLog[]).filter((log) =>
    log.staffId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">User Log History</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span>Show:</span>
              <select className="border border-gray-300 rounded px-2 py-1 bg-gray-200">
                <option>10</option>
              </select>
              <span>Entries</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-300">
                  <TableHead className="font-bold">No.</TableHead>
                  <TableHead className="font-bold">Date/Sign In Time</TableHead>
                  <TableHead className="font-bold">Staff ID</TableHead>
                  <TableHead className="font-bold">Department</TableHead>
                  <TableHead className="font-bold">Activity</TableHead>
                  <TableHead className="font-bold">Date/Sign Out time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
                  </TableRow>
                ) : filteredLogs.length > 0 ? (
                  filteredLogs.map((log, index) => (
                    <TableRow key={log.id} className="hover:bg-gray-50 border-b border-gray-200">
                      <TableCell className="font-medium">{index + 1}.</TableCell>
                      <TableCell>{formatDate(log.signInTime)}</TableCell>
                      <TableCell>{log.staffId || `XL${log.userId?.padStart(6, '0')}`}</TableCell>
                      <TableCell>{log.department || "OT"}</TableCell>
                      <TableCell>{log.activity}</TableCell>
                      <TableCell>{formatDate(log.signOutTime)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No log entries found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {filteredLogs.length > 0 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div>Showing 1 to {Math.min(5, filteredLogs.length)} of {filteredLogs.length} entries</div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 border rounded">«</button>
                <button className="px-2 py-1 border rounded bg-gray-200">1</button>
                <button className="px-2 py-1 border rounded">»</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}