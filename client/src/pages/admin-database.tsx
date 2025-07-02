import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { User } from "@shared/schema";

export default function AdminDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("user");

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.staffId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Database</h2>
        </div>
        
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="user" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                User
              </TabsTrigger>
              <TabsTrigger 
                value="operation" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Operation Team
              </TabsTrigger>
              <TabsTrigger 
                value="technical" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Technical Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="mt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Find ticket"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 bg-gray-200"
                  />
                  <Button variant="ghost" size="icon" className="bg-gray-200">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Button>
                </div>
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
                      <TableHead className="font-bold">Staff ID</TableHead>
                      <TableHead className="font-bold">Name</TableHead>
                      <TableHead className="font-bold">Department</TableHead>
                      <TableHead className="font-bold">Specialty</TableHead>
                      <TableHead className="font-bold">Setting</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                      </TableRow>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user: User) => (
                        <TableRow key={user.id} className="hover:bg-gray-50 border-b border-gray-200">
                          <TableCell className="font-medium">
                            {user.staffId || `ABC${user.id.toString().padStart(3, '0')}`}
                          </TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>
                            <Badge className="bg-gray-200 text-gray-800">
                              {user.department || "Support"}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.specialty || "General"}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <div>Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries</div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 border rounded">«</button>
                    <button className="px-2 py-1 border rounded bg-gray-200">1</button>
                    <button className="px-2 py-1 border rounded">»</button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="operation" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                Operation Team management coming soon
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                Technical Support management coming soon
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}