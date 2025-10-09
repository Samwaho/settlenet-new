import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupDuplicates() {
  console.log('🔍 Finding duplicate phone numbers...');
  
  try {
    // Find all phone numbers that appear more than once
    const duplicates = await prisma.guestRegistration.groupBy({
      by: ['phoneNumber'],
      _count: {
        phoneNumber: true
      },
      having: {
        phoneNumber: {
          _count: {
            gt: 1
          }
        }
      }
    });

    console.log(`Found ${duplicates.length} phone numbers with duplicates:`);
    
    for (const duplicate of duplicates) {
      console.log(`\n📱 Phone: ${duplicate.phoneNumber} (${duplicate._count.phoneNumber} entries)`);
      
      // Get all records for this phone number
      const records = await prisma.guestRegistration.findMany({
        where: { phoneNumber: duplicate.phoneNumber },
        orderBy: { createdAt: 'asc' } // Keep the oldest one
      });

      console.log(`   Records found: ${records.length}`);
      
      // Keep the first (oldest) record, delete the rest
      const toDelete = records.slice(1);
      
      if (toDelete.length > 0) {
        console.log(`   🗑️  Deleting ${toDelete.length} duplicate(s)...`);
        
        for (const record of toDelete) {
          console.log(`      - Deleting record ${record.id} (created: ${record.createdAt})`);
          await prisma.guestRegistration.delete({
            where: { id: record.id }
          });
        }
      }
    }

    console.log('\n✅ Cleanup completed!');
    
    // Verify no duplicates remain
    const remainingDuplicates = await prisma.guestRegistration.groupBy({
      by: ['phoneNumber'],
      _count: {
        phoneNumber: true
      },
      having: {
        phoneNumber: {
          _count: {
            gt: 1
          }
        }
      }
    });

    if (remainingDuplicates.length === 0) {
      console.log('✅ No duplicates remaining. Safe to apply migration.');
    } else {
      console.log(`❌ Still ${remainingDuplicates.length} phone numbers with duplicates.`);
    }

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDuplicates();
